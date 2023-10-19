'use client'

import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SessionProvider>
			<RecoilRoot>{children}</RecoilRoot>
		</SessionProvider>
	)
}
