import 'server-only'

import ChatPage from '@/components/ChatPage'

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
