/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'custom-green': '#CCFF33',
				'custom-red': '#FF3619',
				'custom-black': '#050A05',
				'custom-gray': '#1E231E',
				'custom-white': '#FFFFFF',
				'custom-light-gray': 'rgba(255, 255, 255, 0.12)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@headlessui/tailwindcss'),
	],
}
