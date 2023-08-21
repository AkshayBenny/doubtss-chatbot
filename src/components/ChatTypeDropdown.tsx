'use client'

import { chatType } from '@/state/recoil'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import ArrowDownSFillIcon from 'remixicon-react/ArrowDownSFillIcon'

export default function ChatTypeDropDown({
	continuation,
}: {
	continuation: Boolean
}) {
	const [isOpen, setIsOpen] = useState(false)
	const [recoilChatType, setRecoilChatType] = useRecoilState(chatType)
	console.log(continuation)
	return (
		<div className='text-right text-sm text-custom-white'>
			<Menu
				as='div'
				className='relative inline-block text-left'>
				{({ open }) => (
					<>
						<Menu.Button
							className={`${
								open
									? `${
											continuation
												? 'rounded-b-[12px]'
												: 'rounded-t-[12px]'
									  } border-[1.5px] border-white border-opacity-[36%]`
									: 'rounded-xl border border-white border-opacity-[12%]'
							} px-[15px] py-[17px] text-custom-green text-sm font-medium  bg-custom-gray  h-full min-w-[116px] flex items-center justify-between gap-1`}>
							{recoilChatType}
							<ArrowDownSFillIcon className='text-custom-white w-[18px] h-[18px]' />
						</Menu.Button>
						<Transition
							as={Fragment}
							enter='transition ease-out duration-100'
							enterFrom='transform opacity-0 '
							enterTo='transform opacity-100 scale-100'
							leave='transition ease-in duration-75'
							leaveFrom='transform opacity-100 scale-100'
							leaveTo='transform opacity-0 scale-95'>
							<Menu.Items
								onClick={() =>
									setRecoilChatType(
										recoilChatType === 'Question'
											? 'Summary'
											: 'Question'
									)
								}
								as='div'
								className={`cursor-pointer absolute ${
									continuation
										? 'top-[-55px] rounded-t-[12px]'
										: 'top-[55px] rounded-b-[12px]'
								} right-0 w-full origin-top-right  bg-custom-gray shadow-lg focus:outline-none px-[15px] py-[17px] text-custom-white text-sm font-medium border-[1.5px] border-custom-white border-opacity-[36%]`}>
								<Menu.Item>
									{({ active }) => (
										<p>
											{recoilChatType === 'Question'
												? 'Summary'
												: 'Question'}
										</p>
									)}
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
		</div>
	)
}
