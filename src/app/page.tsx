import 'server-only'

import ChatPage from '@/components/ChatPage'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

export default async function MainChatPage() {
	const session = await getServerSession(options)
	return <ChatPage session={session} />
}

// generate question
// signin
