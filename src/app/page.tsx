'use client'

import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'
import { RecoilRoot } from 'recoil'

export default function ChatPage() {
	return (
		<RecoilRoot>
			<div className='bg-custom-black h-screen w-screen relative'>
				<Navbar />
				<Chat />
			</div>
		</RecoilRoot>
	)
}
