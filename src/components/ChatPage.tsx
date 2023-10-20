'use client'

import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'
import { useEffect } from 'react'
import Logo from './Logo'
import { addUserDexie } from '@/app/dexie/crud'

export default function ChatPage({ session }: any) {
	useEffect(() => {
		const addNewUserDexie = async () => {
			if (session) {
				let newDexieUser = {
					name: session.user.name,
					email: session.user.email,
				}
				await addUserDexie(newDexieUser)
			}
		}

		if (window && !('indexedDB' in window)) {
			console.log('IndexedDB not supported')
		} else {
			addNewUserDexie()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session])

	return (
		<>
			{session && (
				<>
					<div className='bg-custom-black h-screen w-screen relative md:block hidden'>
						<Navbar />
						<Chat userSessionData={session} />
					</div>
					<div className='flex flex-col items-center justify-center md:hidden bg-custom-black h-screen w-screen p-[20px]'>
						<Logo type='md' />
						<p className='text-[16px] text-white text-center pt-[20px]'>
							Under construction! Sorry for the inconvenience. We
							do not support mobile devices at the moment. Stay
							tuned.
						</p>
					</div>
				</>
			)}
		</>
	)
}
