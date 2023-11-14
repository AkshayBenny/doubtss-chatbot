'use client'

import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import { showFAQModal, showFeedbackSubmitConfirmation } from '@/state/recoil'
import { useRecoilState } from 'recoil'
import Link from 'next/link'

export default function ConfirmFeedbackSubmission() {
	const [
		recoilSubmitConfimationFeedback,
		setRecoilSubmitConfirmationFeedback,
	] = useRecoilState(showFeedbackSubmitConfirmation)
	const [recoilShowFAQModal, setRecoilShowFAQModal] =
		useRecoilState(showFAQModal)

	const closeSubmitConfirmationModal = () => {
		setRecoilSubmitConfirmationFeedback(false)
	}

	const openFAQModal = () => {
		setRecoilSubmitConfirmationFeedback(false)
		setRecoilShowFAQModal(true)
	}

	return (
		<div className='text-custom-white absolute z-[100] flex flex-col items-center justify-center bg-custom-gray p-[40px] space-y-[32px] rounded-[20px] w-full mx-auto border border-white border-opacity-[12%] max-w-[886px]'>
			<button
				onClick={closeSubmitConfirmationModal}
				className='absolute right-[20px] top-[20px] rounded-full bg-custom-white bg-opacity-[12%] z-50 p-2'>
				<CloseLineIcon />
			</button>
			<h2 className='font-semibold text-[26px]'>Feedback Submitted</h2>
			<Link
				legacyBehavior
				href='mailto:support@doubtss.com'
				passHref>
				<p className='font-normal text-sm max-w-[806px] text-center'>
					We&apos;ve received your feedback and will review it
					promptly. In the meantime, if you have any further questions
					or need assistance, reach out to our support team at{' '}
					<span className='underline'>support@doubtss.com</span>.
				</p>
			</Link>

			<button
				className='text-custom-green'
				onClick={openFAQModal}>
				Submit Another Feedback
			</button>
		</div>
	)
}
