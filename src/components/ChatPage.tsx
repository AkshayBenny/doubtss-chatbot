'use client'

import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'
import { useEffect } from 'react'
import Logo from './Logo'
import { db } from '@/app/dexie/db'

export default function ChatPage() {
	useEffect(() => {
		const initializeDatabase = async () => {
			try {
				await db.open() // This may be necessary to open the database explicitly
				// Other initialization steps if needed
				console.log('Database initialized')
			} catch (error) {
				console.error('Error initializing the database:', error)
			}
		}

		initializeDatabase()
	}, [])

	return (
		<>
			<div className='bg-custom-black h-screen w-screen relative md:block hidden'>
				<Navbar />
				<Chat />
			</div>
			<div className='flex flex-col items-center justify-center md:hidden bg-custom-black h-screen w-screen p-[20px]'>
				<Logo type='md' />
				<p className='text-[16px] text-white text-center pt-[20px]'>
					Under construction! Sorry for the inconvenience. We do not
					support mobile devices at the moment. Stay tuned.
				</p>
			</div>
		</>
	)
}
