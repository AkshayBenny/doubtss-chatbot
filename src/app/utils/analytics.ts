// @ts-nocheck
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Replace with your Google Analytics tracking ID
const GA_MEASUREMENT_ID = 'YOUR_GOOGLE_ANALYTICS_MEASUREMENT_ID'

// Initialize GA by inserting the necessary script tag
const initGA = () => {
	// Ensure GA is not already initialized
	if (window['ga'] && window['ga'].getAll) return

	window['gtag'] =
		window['gtag'] ||
		function () {
			;(window['gtag'].q = window['gtag'].q || []).push(arguments)
		}

	window['gtag']('js', new Date())
	window['gtag']('config', GA_MEASUREMENT_ID)
}

// Log the pageview with GA
const logPageView = (url: string) => {
	window['gtag']('config', GA_MEASUREMENT_ID, {
		page_path: url,
	})
}

// Log an event with GA
export const logEvent = (
	category: string,
	action: string,
	label?: string,
	value?: number
) => {
	// if (!GA_MEASUREMENT_ID) return

	// window['gtag']('event', action, {
	// 	event_category: category,
	// 	event_label: label,
	// 	value: value,
	// })
	console.log('Event')
}

// Use this hook in your _app.tsx for tracking page views
export const useGoogleAnalytics = () => {
	const router = useRouter()

	useEffect(() => {
		if (!GA_MEASUREMENT_ID) return

		const handleRouteChange = (url: URL) => {
			initGA()
			logPageView(url)
		}

		router.events.on('routeChangeComplete', handleRouteChange)

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router])
}
