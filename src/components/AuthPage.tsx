import 'server-only'

import Logo from './Logo'
import Image from 'next/image'
import AuthLoginForm from './AuthLoginForm'
import AuthRegisterForm from './AuthRegisterForm'
import Link from 'next/link'
import prisma from '@/app/db/prisma'

async function getNumberOfUsers() {
	const count = await prisma.user.count()
	console.log(`Total number of users: ${count}`)
	return count
}

export default async function AuthPage({ type }: { type: string }) {
	// let userCount: any = 0
	// if (type === 'signup') {
	// 	userCount = await getNumberOfUsers()
	// 		.catch((e) => {
	// 			console.error(e)
	// 		})
	// 		.finally(async () => {
	// 			await prisma.$disconnect()
	// 		})
	// }

	// if (userCount < 100) {
	// 	return (
	// 		<div className='text-custom-white'>
	// 			<h2 className='font-extrabold text-[64px] text-center'>
	// 				Join our beta to enhance your preparation speed and get
	// 				ahead of competitors{' '}
	// 				<span className='text-custom-green font-extrabold text-[64px]'>
	// 					.
	// 				</span>
	// 			</h2>
	// 			<div></div>
	// 		</div>
	// 	)
	// }

	return (
		<div className='w-screen h-screen max-w-screen max-w-screen overflow-clip flex text-custom-white'>
			{/* <div className='max-w-[65%] w-full h-full relative  pb-[52px]'>
				<Image
					unoptimized
					src='/finalTestimonial.png'
					height={100}
					width={100}
					className='w-full h-full object-cover absolute -z-10'
					alt='Testimonial person'
				/>
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
			</div> */}
			<div className='w-full h-full max-w-[320px] flex flex-col items-center justify-between py-[52px] mx-auto'>
				<div className='relative w-fit'>
					<div className='font-normal text-[11px] w-fit p-[6px] rounded-[4px] bg-custom-light-gray absolute right-0 top-[-20px] text-white text-opacity-80 scale-[90%]'>
						Experimental
					</div>
					<h3 className='text-custom-green font-bold text-[20px]'>
						Doubtss.com
					</h3>
				</div>
				<div className='w-full'>
					<h2 className='font-semibold text-[28px] text-center '>
						{type === 'login' ? 'Welcome' : 'Create account'}
					</h2>
					<p className='text-center leading-[18px] pt-2 text-sm'>
						Let&apos;s get started by filling up.
					</p>
					{type === 'login' ? (
						<AuthLoginForm />
					) : (
						<AuthRegisterForm />
					)}
				</div>
				<div className='opacity-60 flex items-center justify-center gap-6 text-[14px]'>
					<Link href='terms-of-service'>
						<h4>Terms of Service</h4>
					</Link>
					<Link href='privacy-policy'>
						<h4>Privacy Policy</h4>
					</Link>
				</div>
			</div>
		</div>
	)
}
