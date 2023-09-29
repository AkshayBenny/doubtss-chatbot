'use client'

import { showFAQModal } from '@/state/recoil'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'

export default function FeedbackModal() {
	const [feedback, setFeedback] = useState('')
	const [FAQModal, setFAQModal] = useRecoilState(showFAQModal)

	const submitHandler = (e: any) => {
		e.preventDefault()
	}

	return (
		<form
			onSubmit={submitHandler}
			className='w-full max-w-[886px] mx-auto absolute border border-white border-opacity-[12%] bg-custom-gray px-10  rounded-[20px] flex flex-col items-center justify-center py-10 z-[100]'>
			<button
				onClick={() => setFAQModal(false)}
				className='absolute right-[20px] top-[20px] rounded-full bg-custom-white bg-opacity-[12%] z-50 p-2'>
				<CloseLineIcon className='h-[18px] w-[18px] text-custom-white ' />
			</button>
			<h2 className='font-semibold text-[26px]  w-full text-start'>
				Write a Feedback
			</h2>
			<textarea
				value={feedback}
				onChange={(e) => setFeedback(e.target.value)}
				placeholder='Type your feedback here...'
				className=' py-[15px] ring-0 outline-none  focus:ring-0 focus:border focus:border-white focus:border-opacity-[12%] focus:outline-none w-full disabled:cursor-not-allowed placeholder:text-[14px] placeholder:text-custom-white placeholder:text-opacity-60 border border-white border-opacity-[12%] rounded-xl  mt-[39px] mb-6 bg-white bg-opacity-5 min-h-[120px] max-h-[600px]'
				name='feedback'
				id='feedback'></textarea>
			<button
				type='submit'
				onClick={() => setFAQModal(false)}
				className='bg-custom-green text-custom-black font-medium text-sm py-[18px] px-[31.5px] rounded-xl mx-auto'>
				Submit Feedback
			</button>
		</form>
	)
}
