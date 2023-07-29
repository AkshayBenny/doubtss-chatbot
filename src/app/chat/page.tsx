import Chat from '@/components/Chat'
import Navbar from '@/components/Navbar'

export default function ChatPage() {
	return (
		<div className='bg-custom-black h-screen w-screen relative'>
			<Navbar />
			<Chat />
		</div>
	)
}
