import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export default async function MainChatPage() {
	const session = await getServerSession(options)
	console.log(session)
	return (
		<div>
			{session ? (
				<div>
					<p>Hello world</p>
					<button onClick={() => signOut()}>Signout</button>
				</div>
			) : (
				<h1 className='text-5xl'>You Shall Not Pass!</h1>
			)}
			{/* <ChatPage /> */}
		</div>
	)
}
