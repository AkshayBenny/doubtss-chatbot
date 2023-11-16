import 'server-only'
import Footer from '@/components/Footer'
import ArrowRightSLineIcon from 'remixicon-react/ArrowRightSLineIcon'
import Link from 'next/link'
import FAQNavbar from '@/components/FAQNavbar'

export default function HelpAndFAQ() {
	return (
		<div className='text-custom-white overflow-x-none w-full min-h-screen'>
			<FAQNavbar />
			<div className='max-w-6xl mx-auto'>
				<div className=''>
					<h3 className='font-extrabold text-[44px] pt-[160px]'>
						Frequently asked questions.
					</h3>
					<div className='pt-12 space-y-[24px] mb-[160px]'>
						<Link
							href='/faq/1'
							className='flex items-center justify-between px-6 py-7 border rounded-2xl border-white border-opacity-20'>
							<p className='font-medium text-xl'>
								How does Doubtss.com work?
							</p>
							<ArrowRightSLineIcon />
						</Link>
						<Link
							href='/faq/2'
							className='flex items-center justify-between px-6 py-7 border rounded-2xl border-white border-opacity-20'>
							<p className='font-medium text-xl'>
								What is the cost of using Doubtss.com?
							</p>
							<ArrowRightSLineIcon />
						</Link>
						<Link
							href='/faq/3'
							className='flex items-center justify-between px-6 py-7 border rounded-2xl border-white border-opacity-20'>
							<p className='font-medium text-xl'>
								Is there a trial period for Doubtss.com?
							</p>
							<ArrowRightSLineIcon />
						</Link>
						<Link
							href='/faq/4'
							className='flex items-center justify-between px-6 py-7 border rounded-2xl border-white border-opacity-20'>
							<p className='font-medium text-xl'>
								Is there a trial period for Doubtss.com?
							</p>
							<ArrowRightSLineIcon />
						</Link>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
