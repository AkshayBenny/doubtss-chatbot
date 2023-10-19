'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import EyeLineIcon from 'remixicon-react/EyeLineIcon'
import EyeOffLineIcon from 'remixicon-react/EyeOffLineIcon'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { welcomeModal } from '@/state/recoil'

export default function AuthLoginForm() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	})
	const [error, setError] = useState('')
	const [recoilWelcomeModal, setRecoilWelcomeModal] =
		useRecoilState(welcomeModal)

	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			setLoading(true)
			setFormValues({ email: '', password: '' })

			const res = await signIn('credentials', {
				redirect: false,
				email: formValues.email,
				password: formValues.password,
				callbackUrl,
			})

			setLoading(false)

			if (!res?.error) {
				router.push(callbackUrl)
				setRecoilWelcomeModal(true)
			} else {
				setError('invalid email or password')
			}
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
			autoComplete='off'
			autoCorrect='off'
			onSubmit={onSubmit}
			className='flex flex-col items-center justify-between w-full max-w-[320px] mx-auto pt-6'>
			{error && <p className='text-center text-custom-red '>{error}</p>}
			<div className='space-y-[16px] w-full'>
				<input
					autoFocus={true}
					autoComplete='off'
					required
					type='email'
					name='email'
					value={formValues.email}
					onChange={handleChange}
					placeholder='Email Address'
					className=' appearance-none ring-0 outline-none border-none focus:ring-0 focus:outline-none focus:border-none px-5 py-[15px] leading-[18px] rounded-xl border border-custom-white border-opacity-[12%] bg-custom-gray placeholder:text-sm w-full !text-sm !font-normal'
				/>
				<div className='flex items-center justify-between px-5 overflow-hidden rounded-xl border border-custom-white border-opacity-[12%] bg-custom-gray w-full'>
					<input
						required
						autoComplete='new-password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Password'
						name='password'
						value={formValues.password}
						onChange={handleChange}
						className='ring-0 outline-none  focus:ring-0 focus:outline-none focus:border-none appearance-none border-none px-0 py-[15px] w-full h-full placeholder:text-sm bg-custom-gray !text-sm !font-normal'
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
				<p className='text-sm text-center'>
					Forgot password?{' '}
					<button className='cursor-pointer text-custom-green font-medium '>
						Reset now
					</button>
				</p>
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
				Dont have an account?
				<span className='text-custom-green font-medium'>
					<Link href='/signup'> Sign up</Link>
				</span>
			</button>
			<div className='w-full flex items-center justify-center gap-4 pt-6'>
				<div className='h-[1px] w-full bg-custom-white bg-opacity-20'></div>
				<p>OR</p>
				<div className='h-[1px] w-full bg-custom-white bg-opacity-20'></div>
			</div>
			<button
				onClick={() => {
					signIn('google', { callbackUrl: '/' })
					setRecoilWelcomeModal(true)
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
