'use client'

import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import axios from 'axios'
import Logo from './Logo'
import { useSession } from 'next-auth/react'
import { addUser } from '@/app/dexie/user'

export default async function ChatPage({ session: serverSession }: any) {
	const { data: session, status } = useSession()
	const [userDataState, setUserDataState] = useState({})

	useEffect(() => {
		const addUserDyxie = async () => {
			if (serverSession) {
				await addUser(serverSession.user.name, serverSession.user.email)
			}
		}

		if (!('indexedDB' in window)) {
			console.log('IndexedDB not supported')
		} else {
			addUserDyxie()
		}
	}, [serverSession])
	useEffect(() => {
		const createOrUpdateUser = async () => {
			if (session) {
				const { data } = await axios.post(
					'/api/create-or-update',
					{
						user_clerk_id: session?.user.email || '',
						email: session?.user.email || '',
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
					}
				)
				console.log('response>>>', data.data.user)
				setUserDataState(data?.data?.user)
			}
		}
		// createOrUpdateUser()
	}, [session, status])

	return (
		<RecoilRoot>
			<div className='bg-custom-black h-screen w-screen relative md:block hidden'>
				<Navbar />
				<Chat userDataState={userDataState} />
			</div>
			<div className='flex flex-col items-center justify-center md:hidden bg-custom-black h-screen w-screen p-[20px]'>
				<Logo />
				<p className='text-[16px] text-white text-center pt-[20px]'>
					Under construction! Sorry for the inconvenience. We do not
					support mobile devices at the moment. Stay tuned.
				</p>
			</div>
		</RecoilRoot>
	)
}
