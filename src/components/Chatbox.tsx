'use client'

import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import SendPlane2FillIcon from 'remixicon-react/SendPlane2FillIcon'
import Loader from './Loader'

export default function Chatbox({
	handleSubmit,
	input,
	handleInputChange,
	isLoading,
	completion,
}: any) {
	return (
		<div className='w-full flex flex-col items-center justify-center mx-auto gap-3 '>
			{isLoading && !completion && <Loader />}
			<form
				onSubmit={handleSubmit}
				className='flex items-center justify-center gap-3 w-full max-w-[770px] '>
				<div
					className='p-[15px] text-custom-green text-sm font-medium rounded-xl bg-custom-gray border border-white border-opacity-[36%] h-full'
					// name='type'
					id='type'>
					<p>Summary</p>
					{/* <option value='summary'>Summary</option> */}
					{/* <option value='question'>Question</option> */}
				</div>
				<div className='rounded-xl border border-white border-opacity-[36%] flex items-center justify-start gap-3 bg-custom-gray px-[15px] w-full'>
					<SearchLineIcon />
					<input
						type='text'
						className='bg-custom-gray py-[15px] ring-0 outline-none border-none focus:ring-0 focus:border-none focus:outline-none w-full disabled:cursor-not-allowed'
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
		</div>
	)
}
