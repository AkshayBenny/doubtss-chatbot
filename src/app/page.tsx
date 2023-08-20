import ChatPage from '@/components/ChatPage'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

export default async function MainChatPage() {
	const session = await getServerSession(options)
	return <ChatPage session={session} />
}

// Setup NextjAuth =======
// AWS database
// Chat posting from client rework
// Chat accepting from server rework
// Frontend Chat rendering rework
