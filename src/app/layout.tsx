import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import AuthProvider from './context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Doubtss.com',
	description: 'Help you pass UPSC CSE exam with ease',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='en'
			className='bg-custom-black'>
			<Script
				id='google-tag-manager'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `(function(w,d,s,l,i) {
							w[l] = w[l] || [];
							w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
						var f = d.getElementsByTagName(s)[0];
						var j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
						j.async = true;
						j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
						f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-54BQ247G');`,
				}}
			/>
			<body className={inter.className}>
				<AuthProvider>
					<noscript
						dangerouslySetInnerHTML={{
							__html: `<iframe
						src='https://www.googletagmanager.com/ns.html?id=GTM-54BQ247G'
						height='0'
						width='0'></iframe>`,
						}}></noscript>
					<main>{children}</main>
				</AuthProvider>
			</body>
		</html>
	)
}
