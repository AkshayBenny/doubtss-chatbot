'use client'

import { deleteAllMessagesDexie } from '@/app/dexie/crud'
import { chatHistory, showClearChatModal, userData } from '@/state/recoil'
import { useRecoilState } from 'recoil'

export default function ClearChatModal({ stop }: any) {
	const [chats, setChats] = useRecoilState(chatHistory)
	const [clearChatModal, setClearChatModal] =
		useRecoilState(showClearChatModal)
	const [recoilUser, setRecoilUser] = useRecoilState(userData)
	console.log(recoilUser.email)
	const clearChatHandler = async () => {
		setChats([])
		stop()
		if (recoilUser.email) {
			try {
				deleteAllMessagesDexie()
			} catch (error) {
				console.log(error)
			}
		}
		setClearChatModal(false)
	}
	const closeModal = () => {
		setClearChatModal(false)
	}

	return (
		<div className='absolute top-0 right-0 bg-custom-black h-screen w-screen overflow-clip z-[100] backdrop-blur-[0.5px] bg-opacity-80 flex items-center justify-center'>
			<div className='bg-custom-gray border border-custom-white border-opacity-[12%] text-center p-10 rounded-2xl'>
				<h6 className='font-semibold text-[26px] pb-3'>Clear Chat</h6>
				<p className='text-sm pb-6'>
					Are you sure that you want to clear this chat?
				</p>
				<div className='flex items-center justify-center w-full gap-2'>
					<button
						onClick={closeModal}
						className='font-medium text-xs py-4 px-[10px] border border-custom-white rounded-[9px] w-full'>
						Cancel
					</button>
					<button
						onClick={clearChatHandler}
						className='text-white font-medium text-xs py-4 px-[10px] border border-custom-red bg-custom-red rounded-[9px] w-full'>
						Clear Chat
					</button>
				</div>
			</div>
		</div>
	)
}
