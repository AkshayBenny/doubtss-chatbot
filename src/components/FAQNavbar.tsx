import Image from 'next/image'
import 'server-only'

export default function FAQNavbar() {
	return (
		<div className='px-[64px] pt-[33px]'>
			<nav className='flex items-center justify-between'>
				<Image
					src='/doubtss-exp-logo.svg'
					height={42}
					width={131}
					alt='Doubtss logo'
				/>
				<div className='flex items-center justify-center gap-12'>
					<p>Collections</p>
					<p>Website</p>
					<p>English</p>
				</div>

				<button className='px-[15px] py-[10px] border rounded-[10px] border-custom-white text-base font-semibold'>
					Go to Chat
				</button>
			</nav>
		</div>
	)
}
