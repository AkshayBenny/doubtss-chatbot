import Footer from '@/components/Footer'
import Link from 'next/link'
import 'server-only'

export default function PrivacyPolicyPage() {
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
				<h1 className='font-extrabold text-[44px]'>
					Doubtss.com Privacy Policy
				</h1>
				<p className='text-sm text-opacity-60 '>
					Last updated: August 27, 2023
				</p>
				<div className='pt-[80px] space-y-[32px]'>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>Introduction</h3>
						<p className='font-normal text-base'>
							Welcome to Doubtss, a product of Indvalley. We
							respect your privacy and are committed to protecting
							your personal data. This privacy policy will inform
							you about how we handle your personal data, your
							privacy rights, and how the law protects you.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Data we Collect
						</h3>
						<p className='font-normal text-base'>
							When you use our platform, we collect the following
							data:
						</p>
						<ul className='list-inside list-disc font-normal text-base'>
							<li>
								Personal Data: Name, email, and profile photo
								(obtained through one-click authentication via
								Google, Facebook, and Instagram).
							</li>
							<li>
								Non-Personal Data: Browser type, device type.
							</li>
						</ul>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							How we Use Your Data
						</h3>
						<p className='font-normal text-base'>
							We use your data for the following purposes:
						</p>
						<ul className='list-inside list-disc font-normal text-base'>
							<li>
								To provide you with a personalized experience.
							</li>
							<li>
								To address feedback and improve our platform.
							</li>
							<li>For marketing purposes.</li>
						</ul>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Data Sharing and Disclosure
						</h3>
						<p className='font-normal text-base'>
							We do not sell your personal data. While we use
							third-party integrations like Mixpanel, GA4, and
							Microsoft Clarity to enhance user experience, we do
							not share your data with other third parties for
							financial gains.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>Data Storage</h3>
						<p className='font-normal text-base'>
							Your personal data is stored in the cloud, while
							user interaction and usage data are stored on your
							computer. Our cloud partners employ robust security
							measures to protect your data.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Data Retention
						</h3>
						<p className='font-normal text-base'>
							We retain your data until you delete your account.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>User Rights</h3>
						<p className='font-normal text-base'>
							Changes to your profile photo, name, etc., on our
							platform will reflect only when you make changes on
							Google, Instagram, or Facebook. Currently, users
							cannot opt-out of data collection or request data
							access.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>Cookies</h3>
						<p className='font-normal text-base'>
							We do not use cookies at the moment. However, any
							future use will be updated in this policy.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Third-Party Links
						</h3>
						<p className='font-normal text-base'>
							Our platform does not contain links to third-party
							websites.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>
							Changes to this Privacy Policy
						</h3>
						<p className='font-normal text-base'>
							We may update our privacy policy from time to time.
							We will notify you of any changes by posting the new
							privacy policy on this page.
						</p>
					</div>
					<div className='space-y-[8px]'>
						<h3 className='font-semibold text-2xl'>Contact Us</h3>
						<p className='font-normal text-base'>
							For any questions or concerns about this privacy
							policy, please contact us at doubtss.ops@gmail.com.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
