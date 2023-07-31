// ts-nocheck
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Doubtss',
	description: 'Help you pass UPSC exam with ease',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		// Initialize Google Tag Manager with your GTM ID.
		TagManager.initialize({ gtmId: 'GTM-54BQ247G' })
	}, [])

	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>{children}</body>
			</html>
		</ClerkProvider>
	)
}
