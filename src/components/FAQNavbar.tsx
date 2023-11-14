import Image from 'next/image'
import 'server-only'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import Link from 'next/link'

export default function FAQNavbar() {
	return (
		<div className='px-[64px] pt-[33px] pb-[64px]  bg-opacity-[12%] rounded-b-[16px]'>
			<nav className='flex items-center justify-between'>
				<Link href='/'>
					<Image
						src='/doubtss-exp-logo.svg'
						height={42}
						width={131}
						alt='Doubtss logo'
					/>
				</Link>

				<Link
					href='/'
					className='px-[15px] py-[10px] border rounded-[10px] border-custom-white text-base font-semibold'>
					Go to Chat
				</Link>
			</nav>
		</div>
	)
}
