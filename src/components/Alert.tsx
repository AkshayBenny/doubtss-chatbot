'use client'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import NotificationIcon from 'remixicon-react/NotificationLineIcon'

export default function Alert() {
	return (
		<div className='text-right text-sm text-custom-white'>
			<Menu
				as='div'
				className='relative inline-block text-left'>
				<div>
					<Menu.Button className='p-3 border border-custom-gray rounded-xl flex items-center justify-center'>
						<NotificationIcon
							className='h-[18px] w-[18px] text-violet-200 hover:text-violet-100'
							aria-hidden='true'
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'>
					<Menu.Items className='absolute right-0 mt-2 w-[243px] origin-top-right divide-y divide-custom-light-gray rounded-md bg-custom-gray shadow-lg focus:outline-none '>
						<div className='px-[15px] py-[16px]'>
							<Menu.Item>
								{({ active }) => (
									<div
										className={`group w-full rounded-md py-[10.25px] text-sm text-left`}>
										We have added{' '}
										<span className='mx-1 font-semibold text-sm text-custom-green'>
											10 Free Trials
										</span>{' '}
										to your account. Explore now &#128640;
										<button className='mt-4 w-fit px-2 py-[10px] border border-custom-white border-opacity-80 rounded-[9px]'>
											Upgrade to Plus
										</button>
									</div>
								)}
							</Menu.Item>
						</div>
						<div className='px-[15px] py-[16px]'>
							<Menu.Item>
								{({ active }) => (
									<div
										className={`group w-full rounded-md py-[10.25px] text-sm text-left`}>
										Invite friends and earn upto{' '}
										<span className='ml-1 font-semibold text-sm text-custom-green'>
											30 Free Trials
										</span>{' '}
										. Try now &#128293;
										<button className='mt-4 w-fit px-2 py-[10px] border border-custom-white border-opacity-80 rounded-[9px]'>
											Refer a Friend
										</button>
									</div>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}
