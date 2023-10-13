'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
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

export default function AuthLoginForm() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	})
	const [error, setError] = useState('')

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

			console.log(res)
			if (!res?.error) {
				router.push(callbackUrl)
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
					required
					type='email'
					name='email'
					value={formValues.email}
					onChange={handleChange}
					placeholder='Email Address'
					className='appearance-none ring-0 outline-none border-none focus:ring-0 focus:outline-none focus:border-none px-5 py-[15px] leading-[18px] rounded-xl border border-custom-white border-opacity-[12%] bg-custom-gray placeholder:text-sm w-full'
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
					<Link href='/signup'>Sign up</Link>
				</span>
			</button>
		</form>
	)
}
