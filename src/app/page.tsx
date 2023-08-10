import 'server-only'

import ChatPage from '@/components/ChatPage'
import { getUserMessages } from './utils/prisma/getMessages'

export default async function MainChatPage() {
	return <ChatPage />
}
