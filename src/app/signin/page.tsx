import 'server-only'
import AuthPage from '@/components/AuthPage'
import Logo from '@/components/Logo'

export default async function SigninPage() {
	return (
		<>
			<div className='md:block hidden'>
				<AuthPage type='login' />
			</div>
			<div className='flex flex-col items-center justify-center md:hidden bg-custom-black h-screen w-screen p-[20px]'>
				<Logo type='md' />
				<p className='text-[16px] text-white text-center pt-[20px]'>
					Under construction! Sorry for the inconvenience. We do not
					support mobile devices at the moment. Stay tuned.
				</p>
			</div>
		</>
	)
}
