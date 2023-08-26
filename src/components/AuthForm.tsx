'use client'

import Link from 'next/link'
import { useState } from 'react'
import EyeLineIcon from 'remixicon-react/EyeLineIcon'
import EyeOffLineIcon from 'remixicon-react/EyeOffLineIcon'

const providers = [
	{
		id: 'google',
		img: '/google-logo.svg',
		name: 'Google',
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

export default function AuthForm({ type }: { type: string }) {
	const [showPassword, setShowPassword] = useState(false)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('submitted')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center justify-between w-full max-w-[320px] mx-auto pt-6'>
			<div className='space-y-[16px] w-full'>
				<input
					type='email'
					placeholder='Email Address'
					className='px-5 py-[15px] leading-[18px] rounded-xl border border-custom-white border-opacity-[12%] bg-custom-gray placeholder:text-sm w-full'
				/>
				<div className='flex items-center justify-between px-5 overflow-hidden rounded-xl border border-custom-white border-opacity-[12%] bg-custom-gray w-full'>
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder='Password'
						className='border-none px-0 py-[15px] w-full h-full placeholder:text-sm bg-custom-gray'
					/>
					<button
						onClick={() => setShowPassword(!showPassword)}
						className='hover:cursor-pointer'>
						{showPassword ? (
							<EyeOffLineIcon className='h-[18px] w-[18px] text-custom-white' />
						) : (
							<EyeLineIcon className='h-[18px] w-[18px] text-custom-white' />
						)}
					</button>
				</div>
				{type === 'login' && (
					<p className='text-sm text-center'>
						Forgot password?{' '}
						<span className='text-custom-green font-medium '>
							Reset now
						</span>
					</p>
				)}
				{/* {providers.map((provider, index) => {
                    return (
								<AuthButton
									key={index}
									img={provider.img}
									name={provider.name}
									id={provider.id}
                                    />
                                    )
                                })} */}
			</div>
			<button className='bg-custom-green text-custom-black text-sm font-semibold w-full px-5 py-[15px] rounded-xl signin-btn-shadow mt-6'>
				Continue
			</button>
			<button className='text-sm text-center pt-6'>
				{type === 'login'
					? 'Dont have an account?'
					: 'Already have an account?'}{' '}
				<span className='text-custom-green font-medium'>
					<Link href={type === 'login' ? '/signup' : '/signin'}>
						{type === 'login' ? 'Sign up' : 'Log in'}
					</Link>
				</span>
			</button>
		</form>
	)
}
