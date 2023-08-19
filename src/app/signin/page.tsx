
import AuthButton from '@/components/AuthButton'
import Logo from '@/components/Logo'

export default async function SigninPage() {
	const providers = [
		{
			id: 'github',
			img: '/google-logo.svg',
			name: 'Github',
		},
		{
			id: 'github',
			img: '/microsoft-logo.svg',
			name: 'Microsoft',
		},
		{
			id: 'github',
			img: '/facebook-logo.svg',
			name: 'Facebook',
		},
		{
			id: 'github',
			img: '/apple-logo.svg',
			name: 'Apple',
		},
	]
	return (
		<div className='w-screen h-screen max-w-screen max-w-screen flex text-custom-white'>
			{/* <div className="bg-[url('/testimonial.jpg')] w-full h-full max-w-[70%]"></div> */}
			<div className="max-w-[65%] w-full h-full relative bg-[url('/testimonial02.jpg')] object-cover grayscale py-[52px]">
				{/* <Image
					unoptimized
					quality={100}
					src='/testimonial02.jpg'
					height={100}
					width={100}
					className='w-full h-full object-cover testimonial-person-baw grayscale'
					alt='Testimonial person'
				/> */}
				<div className='absolute top-0 right-0 w-full h-full opacity-50 z-10 testimonial-person-baw'></div>
				<div className='relative z-50 h-full w-full flex flex-col items-center justify-end'>
					<div className='w-full px-[84px] space-y-[28px]'>
						<h6 className='font-semibold text-[28px]'>
							Doubtss revolutionised my UPSC preparation.
							It&apos;s ability to generate unlimited sample
							question is a killer feature making it an
							indispensable resource.
						</h6>
						<div className='text-sm font-medium opacity-80 space-y-[4px]'>
							<p>Dwayne Johnson</p>
							<p>AIR 12, UPSC Prelims 2023</p>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full h-full max-w-[35%] flex flex-col items-center justify-between py-[52px]'>
				<Logo />
				<div className='w-full'>
					<h2 className='font-semibold text-[28px] text-center pb-6'>
						Welcome
					</h2>
					<div className='space-y-[16px] w-full max-w-[320px] mx-auto'>
						{providers.map((provider, index) => {
							return (
								<AuthButton
									key={index}
									img={provider.img}
									name={provider.name}
									id={provider.id}
								/>
							)
						})}
					</div>
					<p className='text-sm text-center pt-6'>
						Dont have an account?{' '}
						<span className='text-custom-green font-medium'>
							Sign Up
						</span>
					</p>
				</div>
				<div className='opacity-60 flex items-center justify-center gap-6'>
					<h4>Terms of Service</h4>
					<h4>Privacy Policy</h4>
				</div>
			</div>
		</div>
	)
}
