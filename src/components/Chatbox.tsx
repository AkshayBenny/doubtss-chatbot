'use client'

import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import SendPlane2FillIcon from 'remixicon-react/SendPlane2FillIcon'
import Loader from './Loader'
import { useRecoilState } from 'recoil'
import { chatType } from '@/state/recoil'

// import ChatTypeDropDown from './ChatTypeDropdown'

export default function Chatbox({
	handleSubmit,
	input,
	setInput,
	isLoading,
	completion,
}: any) {
	const [recoilChatType, setRecoilChatType] = useRecoilState(chatType)
	return (
		<div className='w-full flex flex-col items-center justify-center mx-auto gap-3 '>
			{isLoading && !completion && <Loader />}
			<form
				onSubmit={handleSubmit}
				className='flex items-center justify-center gap-3 w-full max-w-[770px] '>
				<select
					onChange={(e) => {
						e.target.value === 'Summary'
							? setRecoilChatType('Summary')
							: setRecoilChatType('Question')
					}}
					name='type'
					id=''
					className='px-[15px] py-[17px] text-custom-green text-sm font-medium rounded-xl bg-custom-gray border border-white border-opacity-[36%] h-full min-w-[116px]'>
					<option value='Summary'>Summary</option>
					<option value='Question'>Question</option>
				</select>

				{/* <ChatTypeDropDown /> */}
				<div className='rounded-xl border border-white border-opacity-[36%] flex items-center justify-start gap-3 bg-custom-gray px-[15px] w-full'>
					<SearchLineIcon />
					<input
						type='text'
						className='bg-custom-gray py-[15px] ring-0 outline-none border-none focus:ring-0 focus:border-none focus:outline-none w-full disabled:cursor-not-allowed'
						value={input}
						onChange={(e) => {
							setInput(e.target.value)
							console.log(e.target.value)
						}}
						disabled={isLoading && !completion}
					/>
				</div>
				<button
					disabled={isLoading && !completion ? true : false}
					type='submit'
					className='p-[15px] text-custom-green text-sm font-medium rounded-xl bg-custom-gray border border-white border-opacity-[36%] h-full'>
					<SendPlane2FillIcon />
				</button>
			</form>
		</div>
	)
}
