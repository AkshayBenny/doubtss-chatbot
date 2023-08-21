'use client'

import { userData } from '@/state/recoil'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import FileCopyLineIcon from 'remixicon-react/FileCopyLineIcon'

export default async function Message({
	chat,
	isBot,
	index,
}: {
	chat: any
	isBot: boolean
	index: number
}) {
    const [recoilUserState, setRecoilUserState] = useRecoilState(userData)
	return (
		<div
			key={chat.content}
			className={`w-full ${
				isBot ? 'bg-white bg-opacity-5' : 'bg-custom-black'
			}`}>
			<div
				className={`flex items-start justify-start gap-4 text-left  max-w-[770px] mx-auto  ${
					!isBot && index === 0 ? 'pt-[40px] px-7 pb-7' : 'p-7'
				}`}>
				{recoilUserState && (
					<Image
						height={32}
						width={32}
						src={
							isBot ? '/doubtss-pfp.svg' : recoilUserState?.image
						}
						alt='Avatar'
						className='rounded-full'
					/>
				)}

				<p
					className={`leading-normal !whitespace-pre-wrap ${
						!isBot && 'pt-[4px]'
					}`}
					style={{ whiteSpace: 'pre-line' }}>
					{chat.content}
				</p>
			</div>
			<div>
				<FileCopyLineIcon />
			</div>
		</div>
	)
}
