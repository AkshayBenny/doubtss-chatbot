'use client'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { showFAQModal } from '@/state/recoil'
import { useRecoilState } from 'recoil'
import Link from 'next/link'

export default function Options() {
	const [FAQModal, setFAQModal] = useRecoilState(showFAQModal)

	return (
		<div className='text-right text-sm text-custom-white w-full'>
			<Menu
				as='div'
				className='relative inline-block text-left w-full'>
				<div>
					<Menu.Button className='p-3 border border-custom-gray rounded-xl flex items-center justify-center'>
						<Bars3Icon
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
					<Menu.Items className='absolute left-0 mt-2  origin-top-right divide-y divide-custom-light-gray rounded-md bg-custom-gray shadow-lg focus:outline-none w-[200px]'>
						<div className='px-[15px] py-[16px]'>
							{/* <Menu.Item>
								{({ active }) => (
									<button
										className={`group flex w-full items-center rounded-md pt-[0.5px] pb-[10.25px] text-sm`}>
										<Image
											src='/options/star.svg'
											className='mr-2'
											height={18}
											width={18}
											alt='Star icon'
										/>
										<p>Upgrade to{'  '}</p>
										<span className='ml-1 font-semibold text-sm text-custom-green'>
											Plus
										</span>
									</button>
								)}
							</Menu.Item> */}
							{/* <Menu.Item>
								{({ active }) => (
									<button
										className={`group flex w-full items-center rounded-md py-[10.25px] text-sm`}>
										<Image
											src='/options/share.svg'
											className='mr-2'
											height={18}
											width={18}
											alt='Star icon'
										/>
										Invite a friend
									</button>
								)}
							</Menu.Item> */}
							{/* <Menu.Item>
								{({ active }) => (
									<button
										className={`group flex w-full items-center rounded-md py-[10.25px] text-sm`}>
										<Image
											src='/options/setting.svg'
											className='mr-2'
											height={18}
											width={18}
											alt='Star icon'
										/>
										Settings
									</button>
								)}
							</Menu.Item> */}
							<Menu.Item>
								{({ active }) => (
									<Link href='/faq/'>
										<button
											className={`group flex w-full items-center rounded-md py-[10.25px] text-sm`}>
											<Image
												src='/options/external-link.svg'
												className='mr-2'
												height={18}
												width={18}
												alt='Star icon'
											/>
											Help & FAQ
										</button>
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={() => setFAQModal(true)}
										className={`group flex w-full items-center rounded-md py-[10.25px] text-sm`}>
										<Image
											src='/options/external-link.svg'
											className='mr-2'
											height={18}
											width={18}
											alt='Star icon'
										/>
										Feedback
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
