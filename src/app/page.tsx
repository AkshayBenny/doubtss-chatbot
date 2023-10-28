import 'server-only'

import ChatPage from '@/components/ChatPage'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'
import Link from 'next/link'

export default async function MainChatPage() {
	// const session = await getServerSession(options)
	return <ChatPage />
	// if (session != null) {
	// 	return <ChatPage session={session} />
	// } else {
	// 	return (
	// 		<div>
	// 			Not signed in
	// 			<Link href='/signin' />
	// 		</div>
	// 	)
	// }
}
