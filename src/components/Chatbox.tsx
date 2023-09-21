'use client'

import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import SendPlane2FillIcon from 'remixicon-react/SendPlane2FillIcon'
import Loader from './Loader'
import ChatTypeDropDown from './ChatTypeDropdown'

export default function Chatbox({
	handleSubmit,
	input,
	setInput,
	isLoading,
	completion,
	continuation,
}: any) {
	return (
		<div className='w-full flex flex-col items-center justify-center mx-auto gap-3 '>
			{/* {isLoading && !completion && <Loader />} */}
			<form
				onSubmit={handleSubmit}
				className='flex items-center justify-center gap-3 w-full max-w-[770px] '>
				<ChatTypeDropDown continuation={continuation} />
				<div className='rounded-xl border border-white border-opacity-[12%] flex items-center justify-start gap-3 bg-custom-gray px-[15px] w-full focus-within:border-[1.5px] focus-within:border-custom-white focus-within:border-opacity-[36%] transition'>
					<SearchLineIcon className='w-[18px] h-[18px]' />
					<input
						type='text'
						className='bg-custom-gray py-[15px] ring-0 outline-none border-none focus:ring-0 focus:border-none focus:outline-none w-full disabled:cursor-not-allowed placeholder:text-[14px] placeholder:text-custom-white placeholder:text-opacity-60'
						value={input}
						onChange={(e) => {
							setInput(e.target.value)
						}}
						placeholder='Ask me anything on UPSC CSE'
						disabled={isLoading && !completion}
					/>
				</div>
				<button
					disabled={
						(isLoading && !completion) || input === ''
							? true
							: false
					}
					type='submit'
					className={`${
						(isLoading && !completion) || input === ''
							? 'cursor-not-allowed text-custom-white'
							: 'text-custom-green'
					} p-[15px]  text-sm font-medium rounded-xl bg-custom-gray border border-white border-opacity-[12%] h-full  aspect-square flex items-center justify-center  ${
						continuation ? 'scale-[117%]' : 'scale-[115%]'
					}`}>
					<SendPlane2FillIcon className='w-[18px] h-[18px]' />
				</button>
			</form>
		</div>
	)
}
