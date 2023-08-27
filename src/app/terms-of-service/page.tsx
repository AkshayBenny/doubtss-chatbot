import Footer from '@/components/Footer'
import Link from 'next/link'
import 'server-only'

export default function TermsOfServicePage() {
	return (
		<div className='overflow-x-none w-screen min-h-screen text-custom-white bg-custom-black'>
			<nav className='w-full flex justify-between items-center pt-[33px] px-[64px]'>
				<div className='w-fit'>
					<p className='ml-auto -mb-3 font-normal text-[10px] w-fit p-[5px] rounded-[4px] bg-custom-light-gray  text-opacity-80'>
						Experimental
					</p>
					<h3 className='text-custom-green font-bold text-[20px]'>
						Doubtss.com
					</h3>
				</div>
				<Link href='/'>
					<button className='border border-custom-white py-[10px] px-[15px] rounded-[10px]'>
						Go to Chat
					</button>
				</Link>
			</nav>
			<div className='max-w-3xl mx-auto mt-[92px] mb-[160px]'>
				<h1 className='font-extrabold text-[44px]'>Terms of Service</h1>
				<p className='text-sm text-opacity-60 '>
					Last updated: August 27, 2023
				</p>

				<div className='pt-[80px] space-y-[32px]'>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>Introduction</h3>
						<p className='font-normal text-base'>
							Welcome to Doubtss.com , a product of Ind Valley. By
							using our platform, you agree to these terms and
							conditions. Please read them carefully.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							User Eligibility
						</h3>
						<p className='font-normal text-base'>
							Doubtss is designed for aspirants writing
							examinations in India. While there are no age
							restrictions, the platform is restricted to users
							residing in India.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							User Responsibilities
						</h3>
						<p className='font-normal text-base'>
							Users are responsible for verifying the content,
							especially when seeking sensitive or factual
							information. Users are prohibited from:
						</p>
						<ul className='list-inside list-disc font-normal text-base'>
							<li>
								Asking inappropriate, invalid, or misleading
								questions.
							</li>
							<li>
								Engaging in activities that make the AI model
								biased or provide incorrect information.
							</li>
						</ul>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Content Ownership
						</h3>
						<p className='font-normal text-base'>
							The content used for training purposes on Doubtss is
							owned by the publishers of the respective books and
							articles. Doubtss utilizes this content solely for
							training, and the summaries provided are based on AI
							knowledge and interpretation.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Account Termination
						</h3>
						<p className='font-normal text-base'>
							Users engaging in malicious activities or repeatedly
							asking obsolete questions may have their accounts
							terminated. Terminated user data will be moved to a
							restricted user database to prevent future access
							with the same account.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Dispute Resolution
						</h3>
						<p className='font-normal text-base'>
							Any disputes between users and Doubtss will be
							addressed through communication or legal channels.
							All legal disputes will fall under the jurisdiction
							of Kochi, Kerala.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Limitation of Liability
						</h3>
						<p className='font-normal text-base'>
							Doubtss provides information based on published
							resources. We are not liable for the accuracy of
							this information. While we strive for accuracy,
							there may be instances where the provided answers
							are not 100% correct due to data limitations or
							other challenges.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Subscription and Payment
						</h3>
						<p className='font-normal text-base'>
							Doubtss operates on a subscription model. Users can
							choose from various subscription options.
							Subscriptions last for a month, with auto-debit
							available for users who opt for it. Cancellations
							can be made through the platform, but refunds are
							not provided.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Modifications to the Terms
						</h3>
						<p className='font-normal text-base'>
							We may update our Terms of Service from time to
							time, following industry standards. Users will be
							notified of any significant changes.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Intellectual Property
						</h3>
						<p className='font-normal text-base'>
							The term &quot;Doubtss&quot; is trademarked and
							woodmarked.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							External Links and Third-party Services
						</h3>
						<p className='font-normal text-base'>
							Doubtss does not provide links to external websites
							or integrate with third-party services.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Government Law
						</h3>
						<p className='font-normal text-base'>
							These Terms of Service are governed by the laws of
							the state of Kerala, India.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>Contact Us</h3>
						<p className='font-normal text-base'>
							For any questions or concerns about these terms,
							please contact us at doubtss.ops@gmail.com.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
