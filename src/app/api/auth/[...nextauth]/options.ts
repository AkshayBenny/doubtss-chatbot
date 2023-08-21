import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

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
		// 		username: {
		// 			label: 'Username:',
		// 			type: 'text',
		// 			placeholder: 'your-cool-username',
		// 		},
		// 		password: {
		// 			label: 'Password:',
		// 			type: 'password',
		// 			placeholder: 'your-awesome-password',
		// 		},
		// 	},
		// 	async authorize(credentials) {
		// 		// This is where you need to retrieve user data
		// 		// to verify with credentials
		// 		// Docs: https://next-auth.js.org/configuration/providers/credentials
		// 		const user = { id: '42', name: 'Dave', password: 'nextauth' }

		// 		if (
		// 			credentials?.username === user.name &&
		// 			credentials?.password === user.password
		// 		) {
		// 			return user
		// 		} else {
		// 			return null
		// 		}
		// 	},
		// }),
	],
	pages: {
		signIn: '/signin',
	},
}
