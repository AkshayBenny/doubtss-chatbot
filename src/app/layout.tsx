// ts-nocheck
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Script from 'next/script'

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
				<Script
					id='google_tag_manager_script'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
						function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','GTM-54BQ247G');
                            `,
					}}
					onError={(err) => {
						console.error('Error loading GTM: ', err)
					}}
				/>
				<body className={inter.className}>
					<noscript>
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
