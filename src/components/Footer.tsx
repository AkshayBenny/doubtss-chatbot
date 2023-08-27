import Link from 'next/link'

export default function Footer() {
	return (
		<div className='w-full bg-custom-light-gray flex justify-between px-[88px] py-[64px] rounded-t-[16px] font-medium text-base '>
			<div className='flex flex-col gap-6'>
				<h4 className='font-semibold text-2xl'>Company</h4>
				<Link
					legacyBehavior
					href='mailto:doubtss.com@gmail.com'
					passHref>
					<a>Contact Us</a>
				</Link>
				<p>About Us</p>
				<p>Help Center</p>
				<Link href='privacy-policy'>Privacy Policy</Link>
				<Link href='terms-of-service'>Terms of Service</Link>
			</div>
			<div className='flex flex-col gap-6'>
				<h4 className='font-semibold text-2xl'>Product</h4>

				<p>Pricing</p>
				<p>Testimonials</p>
				<p>FAQ</p>
			</div>
			<div className='flex flex-col gap-[67px]'>
				<div className='flex flex-col gap-6'>
					<h4 className='font-semibold text-2xl'>Socials</h4>

					<a
						href='https://www.instagram.com/doubtss.com_official/'
						target='_blank'>
						Instagram
					</a>
					<a
						href='https://twitter.com/doubtss_dot_com/'
						target='_blank'>
						Twitter
					</a>
					<a
						href='https://www.linkedin.com/company/doubtss-com/'
						target='_blank'>
						Linkedin
					</a>
				</div>
				<p className='font-medium text-base text-opacity-60 text-custom-white'>
					Doubtss.com © 2023
				</p>
			</div>
		</div>
	)
}
