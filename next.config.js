/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		serverActions: true,
		serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
	},

	images: {
		domains: ['img.clerk.com', 'lh3.googleusercontent.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'tjzk.replicate.delivery',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'replicate.delivery',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'a16z.com',
				port: '',
				pathname: '**',
			},
		],
	},
}

module.exports = nextConfig
