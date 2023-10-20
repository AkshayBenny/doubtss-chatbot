import { useState } from 'react'
import FileCopyLineIcon from 'remixicon-react/FileCopyLineIcon'
import ThumbDownLineIcon from 'remixicon-react/ThumbDownLineIcon'
import ThumbUpLineIcon from 'remixicon-react/ThumbUpLineIcon'

export default function ButtonWithPopover({
	type,
	hoverText,
	clickText,
}: {
	type:
		| 'copy'
		| 'like'
		| 'dislike'
		| 'regenerate'
		| 'continue-generating'
		| 'generate-question'
	hoverText: string
	clickText: string
}) {
	const [message, setMessage] = useState('')
	const [showPopover, setShowPopover] = useState(false)

	const handleMouseEnter = () => {
		setMessage(hoverText)
		setShowPopover(true)
	}

	const handleMouseLeave = () => {
		setShowPopover(false)
	}

	const handleClick = () => {
		setMessage(clickText)
		setTimeout(() => {
			setShowPopover(false)
		}, 2000)
		setShowPopover(true)
	}
	return (
		<div className='relative flex items-center justify-center w-full'>
			<button
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				className=''>
				{type === 'copy' && (
					<FileCopyLineIcon className='h-[16px] w-[16px] text-custom-white' />
				)}
				{type === 'like' && (
					<ThumbUpLineIcon className='h-[16px] w-[16px] text-custom-white' />
				)}
				{type === 'dislike' && (
					<ThumbDownLineIcon className='h-[16px] w-[16px] text-custom-white' />
				)}
			</button>
			{showPopover && (
				<div className='absolute bottom-[30px] left-1/2 transform -translate-x-1/2 text-xs font-medium bg-[#676A67] text-custom-white border border-custom-white border-opacity-20 rounded-[6px] shadow-lg py-[6px] px-[8px]  whitespace-nowrap'>
					{message}
					<div className='absolute left-[55%] transform -translate-x-1/2 -translate-y-2 w-3 h-5 -z-10 bg-[#676A67]  rotate-45'></div>
				</div>
			)}
		</div>
	)
}
