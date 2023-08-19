import ChatPage from '@/components/ChatPage'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export default async function MainChatPage() {
	const session = await getServerSession(options)
	console.log(session)
	if (session) {
		return (
			<div>
				<ChatPage />
			</div>
		)
	}

	return <div>Unauthenticated!</div>
}

// Setup NextjAuth =======
// AWS database
// Chat posting from client rework
// Chat accepting from server rework
// Frontend Chat rendering rework
