'use client'

import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { GoogleAnalytics, event } from 'nextjs-google-analytics'

export function reportWebVitals({ id, name, label, value }: any) {
	event(name, {
		category:
			label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
		value: Math.round(name === 'CLS' ? value * 1000 : value),
		label: id,
		nonInteraction: true,
	})
}

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SessionProvider>
			<GoogleAnalytics trackPageViews />
			<RecoilRoot>{children}</RecoilRoot>
		</SessionProvider>
	)
}
