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
					<Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-custom-light-gray rounded-md bg-custom-gray shadow-lg focus:outline-none '>
						<div className='px-[15px] py-[16px]'>
							<Menu.Item>
								{({ active }) => (
									<button
										className={`group flex w-full items-center rounded-md py-[10.25px] text-sm`}>
										We have added 10 Free Trials to your
										account. Explore now 🚀
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}
