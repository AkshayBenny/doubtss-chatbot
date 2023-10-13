import Image from 'next/image'
import 'server-only'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'

export default function FAQNavbar() {
	return (
		<div className='px-[64px] pt-[33px] pb-[64px] bg-custom-white bg-opacity-[12%] rounded-b-[16px]'>
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
			<div className='flex items-center justify-start mx-auto w-full max-w-6xl p-[20px] border border-white border-opacity-[12%] h-[58px] rounded-[12px] mt-[92px] '>
				<SearchLineIcon className='w-[18px] h-[18px]' />
				<input
					className='placeholder:text-base placeholder:text-opacity-80 placeholder:font-normal bg-opacity-0 bg-none bg-transparent border-none ring-0 outline-none focus:ring-0 focus:outline-none h-full w-full'
					type='text'
					placeholder='Search for articles'
				/>
			</div>
		</div>
	)
}
