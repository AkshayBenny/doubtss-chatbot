'use client'

import { useRecoilState } from 'recoil'
import Alert from './Alert'
import Options from './Options'
import { chatHistory } from '@/state/recoil'

export default function Navbar() {
	const [chats, setChats] = useRecoilState(chatHistory)
	return (
		<div className='flex  items-center justify-between px-[39px] py-[32px] fixed top-0 left-0 w-full'>
			<div className='flex items-center justify-start gap-4'>
				<Options />
				{chats.length > 0 && (
					<div className='flex flex-col justify-center items-end w-fit'>
						<div className='font-normal text-[11px] w-fit p-[5px] rounded-[4px] bg-custom-light-gray  text-white text-opacity-80 scale-[90%] -mb-[3px]'>
							Exp.
						</div>
						<h3 className='text-custom-green font-bold text-[16px]'>
							Doubtss
						</h3>
					</div>
				)}
			</div>
			<Alert />
		</div>
	)
}
