'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { ChangeEvent, useState } from 'react'
import EyeLineIcon from 'remixicon-react/EyeLineIcon'
import EyeOffLineIcon from 'remixicon-react/EyeOffLineIcon'
import Image from 'next/image'

export default function AuthRegisterForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		password: '',
	})
	const [error, setError] = useState('')

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		// if (formValues.password !== confirmPassword) {
		// 	setError('Password Missmatch!')
		// 	return
		// }
		setLoading(true)
		setFormValues({ name: '', email: '', password: '' })

		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				body: JSON.stringify(formValues),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			setLoading(false)
			if (!res.ok) {
				setError((await res.json()).message)
				return
			}

			signIn(undefined, { callbackUrl: '/' })
		} catch (error: any) {
			setLoading(false)
			setError(error)
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormValues({ ...formValues, [name]: value })
	}

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col items-center justify-between w-full max-w-[320px] mx-auto pt-6'>
			{error && <p className='text-center text-custom-red '>{error}</p>}
			<div className='space-y-[16px] w-full'>
				<input
					autoFocus={true}
					required
					type='text'
					name='name'
					value={formValues.name}
					onChange={handleChange}
					placeholder='Full Name'
					className='ring-0 outline-none border-none focus:ring-0 focus:outline-none focus:border-none appearance-none px-5 py-[15px] leading-[18px] rounded-xl border border-custom-white border-opacity-[12%] bg-custom-gray placeholder:text-sm w-full'
				/>
				<input
					required
					type='email'
					name='email'
					value={formValues.email}
					onChange={handleChange}
					placeholder='Email Address'
					className='ring-0 outline-none border-none focus:ring-0 focus:outline-none focus:border-none appearance-none px-5 py-[15px] leading-[18px] rounded-xl border border-custom-white border-opacity-[12%] bg-custom-gray placeholder:text-sm w-full'
				/>
				<div className='flex items-center justify-between px-5 overflow-hidden rounded-xl border border-custom-white border-opacity-[12%] bg-custom-gray w-full'>
					<input
						required
						type={showPassword ? 'text' : 'password'}
						placeholder='Password'
						name='password'
						value={formValues.password}
						onChange={handleChange}
						className='ring-0 outline-none  focus:ring-0 focus:outline-none focus:border-none appearance-none border-none px-0 py-[15px] w-full h-full placeholder:text-sm bg-custom-gray'
					/>
					<div
						onClick={() => setShowPassword(!showPassword)}
						className='hover:cursor-pointer'>
						{showPassword ? (
							<EyeOffLineIcon className='h-[18px] w-[18px] text-custom-white' />
						) : (
							<EyeLineIcon className='h-[18px] w-[18px] text-custom-white' />
						)}
					</div>
				</div>
				<div className='flex items-center justify-between px-5 overflow-hidden rounded-xl border border-custom-white border-opacity-[12%] bg-custom-gray w-full'>
					<input
						required
						type={showConfirmPassword ? 'text' : 'password'}
						placeholder='Confirm password'
						name='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className='ring-0 outline-none  focus:ring-0 focus:outline-none focus:border-none appearance-none border-none px-0 py-[15px] w-full h-full placeholder:text-sm bg-custom-gray'
					/>
					<div
						onClick={() =>
							setShowConfirmPassword(!showConfirmPassword)
						}
						className='hover:cursor-pointer'>
						{showConfirmPassword ? (
							<EyeOffLineIcon className='h-[18px] w-[18px] text-custom-white' />
						) : (
							<EyeLineIcon className='h-[18px] w-[18px] text-custom-white' />
						)}
					</div>
				</div>
			</div>
			<button
				type='submit'
				disabled={loading}
				className={`${
					loading && 'cursor-wait'
				} bg-custom-green text-custom-black text-sm font-semibold w-full px-5 py-[15px] rounded-xl signin-btn-shadow mt-6`}>
				{loading ? 'Loading' : 'Continue'}
			</button>
			<button className='text-sm text-center pt-6'>
				Already have an account?
				<span className='text-custom-green font-medium'>
					<Link href='/signin'> Log in</Link>
				</span>
			</button>
			<div className='w-full flex items-center justify-center gap-4 pt-6'>
				<div className='h-[1px] w-full bg-custom-white bg-opacity-20'></div>
				<p>OR</p>
				<div className='h-[1px] w-full bg-custom-white bg-opacity-20'></div>
			</div>
			<button
				disabled={loading}
				onClick={() => {
					signIn('google', { callbackUrl: '/' })
					if (typeof window !== 'undefined') {
						window.dataLayer = window.dataLayer || []
						window.dataLayer.push({
							event: 'like_button_click',
							category: 'Button Click',
							action: 'Test Action',
							label: 'Test Label',
							value: 'Your Value',
						})
					}
				}}
				className='flex items-center justify-center gap-3 font-medium text-sm bg-custom-white bg-opacity-[12%] py-[15px] px-[20px] rounded-[12px] w-full mt-[24px] border-custom-gray '>
				<Image
					src='/google-logo.svg'
					height={18}
					width={18}
					alt='Google logo'
				/>
				<p>Continue with Google</p>
			</button>
		</form>
	)
}
