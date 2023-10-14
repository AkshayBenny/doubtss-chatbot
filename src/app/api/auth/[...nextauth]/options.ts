import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/app/db/prisma'
import { compare } from 'bcryptjs'

export const options: NextAuthOptions = {
	adapter: PrismaAdapter(prisma as any),
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/signin',
	},
	providers: [
		GitHubProvider({
			id: 'github',
			clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
		}),
		GoogleProvider({
			id: 'google',
			clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
		}),
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials: any) {
				if (!credentials?.email || !credentials.password) {
					return null
				}

				const user: any = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				})

				if (
					!user ||
					!(await compare(credentials.password, user.password!))
				) {
					return null
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					randomKey: 'Hey cool',
				}
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					randomKey: token.randomKey,
				},
			}
		},
		jwt: ({ token, user }) => {
			if (user) {
				const u = user as unknown as any
				return {
					...token,
					id: u.id,
					randomKey: u.randomKey,
				}
			}
			return token
		},
	},
}
