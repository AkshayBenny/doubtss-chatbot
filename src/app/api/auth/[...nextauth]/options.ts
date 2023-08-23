import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
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
		// CredentialsProvider({
		// 	id: 'credentials',
		// 	name: 'Credentials',
		// 	credentials: {
		// 		email: {
		// 			label: 'email:',
		// 			type: 'text',
		// 		},
		// 		password: {
		// 			label: 'password:',
		// 			type: 'password',
		// 			placeholder: 'your-awesome-password',
		// 		},
		// 	},
		// 	async authorize(credentials, req) {
		// 		if (typeof credentials !== 'undefined') {
		// 			const res = await authenticate(
		// 				credentials.email,
		// 				credentials.password
		// 			)
		// 			if (typeof res !== 'undefined') {
		// 				return { ...res.user, apiToken: res.token }
		// 			} else {
		// 				return null
		// 			}
		// 		} else {
		// 			return null
		// 		}
		// 	},
		// }),
	],
	// session: { strategy: 'jwt' },
	pages: {
		signIn: '/signin',
	},
}
