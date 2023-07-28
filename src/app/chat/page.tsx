import Navbar from '@/components/Navbar'
import Options from '@/components/Options'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function ChatPage() {
	return (
		<div className='bg-custom-black h-screen w-screen'>
			<Navbar />
		</div>
	)
}
