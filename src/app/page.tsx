'use client'

import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'
import { RecoilRoot } from 'recoil'

export default function ChatPage() {
	return (
		<RecoilRoot>
			<div className='bg-custom-black h-screen w-screen relative md:block hidden'>
				<Navbar />
				<Chat />
			</div>
			<div className='flex flex-col items-center justify-center md:hidden bg-custom-black h-screen w-screen p-[20px]'>
				<div className='relative w-fit'>
					<p className='font-normal text-[11px] w-fit p-[6px] rounded-[4px] bg-custom-light-gray absolute right-0 top-[-20px] text-white text-opacity-80 scale-90'>
						Experimental
					</p>
					<h3 className='text-custom-green font-bold text-[40px]'>
						Doubtss.com
					</h3>
				</div>
				<p className='text-[16px] text-white text-center pt-[20px]'>
					Under construction! Sorry for the inconvenience. We do not
					support mobile devices at the moment. Stay tuned.
				</p>
			</div>
		</RecoilRoot>
	)
}
