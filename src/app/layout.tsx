// ts-nocheck
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

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
	
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}><noscript>
				<iframe
					src='https://www.googletagmanager.com/ns.html?id=GTM-54BQ247G'
					height='0'
					width='0'
					style={{
						display: 'none',
						visibility: 'hidden',
					}}></iframe>
			</noscript>
			{children}
			</body>
			</html>
		</ClerkProvider>
	)
}
