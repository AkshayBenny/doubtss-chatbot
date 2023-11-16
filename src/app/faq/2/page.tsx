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
				<div className='flex items-center justify-between gap-2 text-custom-white w-fit text-sm opacity-60 mt-[32px]'>
					<p>Collections</p>
					<p>&gt;</p>
					<p>Doubtss.com</p>
					<p>&gt;</p>
					<p>What is Doubtss.com</p>
				</div>
				<div className='w-full h-full max-w-6xl mx-auto mt-[80px]'>
					<h2 className='font-extrabold text-[44px] '>
						What is Doubtss.com?
					</h2>
					<div className='flex items-center justify-start gap-4'>
						<div className='w-[40px] h-[40px] rounded-lg bg-custom-green'></div>
						<div className='space-y-[2px]'>
							<p className='font-medium text-base'>John Doe</p>
							<p className='opacity-60 text-sm tracking-[-1%]'>
								Updated over a week ago
							</p>
						</div>
					</div>
				</div>
				<div className='mt-[80px]'>
					<h4 className='font-semibold text-2xl pb-[8px]'>
						How much does it cost to use Doutbss.com?
					</h4>
					<ul className='list-inside list-disc font-normal text-base'>
						<li>The research preview of ChatGPT is free to use.</li>
					</ul>
					<h4 className='pt-[32px] font-semibold text-2xl pb-[8px]'>
						How does Doutbss.com work?
					</h4>
					<ul className='list-inside list-disc font-normal text-base space-y-[8px]'>
						<li>
							Doubtss.com is fine-tuned from GPT-3.5, a language
							model trained to produce text. ChatGPT was optimized
							for dialogue by using Reinforcement Learning with
							Human Feedback (RLHF) – a method that uses human
							demonstrations and preference comparisons to guide
							the model toward desired behavior. ChatGPT is
							fine-tuned from GPT-3.5, a language model trained to
							produce text. ChatGPT was optimized for dialogue by
							using Reinforcement Learning with Human Feedback
							(RLHF) – a method that uses human demonstrations and
							preference comparisons to guide the model toward
							desired behavior.
						</li>
						<li>
							Doubtss.com is fine-tuned from GPT-3.5, a language
							model trained to produce text. ChatGPT was optimized
							for dialogue by using Reinforcement Learning with
							Human Feedback (RLHF) – a method that uses human
							demonstrations and preference comparisons to guide
							the model toward desired behavior. ChatGPT is
							fine-tuned from GPT-3.5, a language model trained to
							produce text. ChatGPT was optimized for dialogue by
							using Reinforcement Learning with Human Feedback
							(RLHF) – a method that uses human demonstrations and
							preference comparisons to guide the model toward
							desired behavior.
						</li>
					</ul>
					<h4 className='pt-[32px] font-semibold text-2xl pb-[8px]'>
						How does Doutbss.com work?
					</h4>
					<ul className='list-inside list-disc font-normal text-base space-y-[8px]'>
						<li>
							Doubtss.com is fine-tuned from GPT-3.5, a language
							model trained to produce text. ChatGPT was optimized
							for dialogue by using Reinforcement Learning with
							Human Feedback (RLHF) – a method that uses human
							demonstrations and preference comparisons to guide
							the model toward desired behavior.
						</li>
					</ul>

					<h3 className='font-extrabold text-[44px] pt-[160px]'>
						Related articles
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
