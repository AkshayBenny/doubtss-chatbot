'use client'
import { useCompletion } from 'ai/react'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import SendPlane2FillIcon from 'remixicon-react/SendPlane2FillIcon'
import { useRecoilState } from 'recoil'
import { chatHistory } from '@/state/recoil'
import { useEffect } from 'react'

export default function Chatbox({
	handleSubmit,
	input,
	handleInputChange,
	isLoading,
	completion,
}: any) {
	return (
		<form
			onSubmit={handleSubmit}
			className='flex items-center justify-center gap-3 w-full max-w-[770px]'>
			<select
				className='p-[15px] text-custom-green text-sm font-medium rounded-xl bg-custom-gray border border-white border-opacity-[36%] h-full'
				name='type'
				id='type'>
				<option value='summary'>Summary</option>
				<option value='question'>Question</option>
			</select>
			{/* {chats.map((chat, index) => (
				<div key={index}>{chat.human || chat.bot}</div>
			))}
			{completion && (
				<div className='mt-2'>
					<p className='text-sm text-gray-200'>{completion}</p>
				</div>
			)} */}
			<div className='rounded-xl border border-white border-opacity-[36%] flex items-center justify-start gap-3 bg-custom-gray px-[15px] w-full'>
				<SearchLineIcon />
				<input
					type='text'
					className='bg-custom-gray py-[15px] ring-0 outline-none border-none focus:ring-0 focus:border-none focus:outline-none w-full'
					value={input}
					onChange={handleInputChange}
					disabled={isLoading && !completion}
				/>
			</div>
			<button
				type='submit'
				className='p-[15px] text-custom-green text-sm font-medium rounded-xl bg-custom-gray border border-white border-opacity-[36%] h-full'>
				<SendPlane2FillIcon />
			</button>
		</form>
	)
}
