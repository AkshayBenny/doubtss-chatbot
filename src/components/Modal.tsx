'use client'

import CloseLineIcon from 'remixicon-react/CloseLineIcon'

export default function Modal({ closeModal }: { closeModal: () => void }) {
	const subjects = [
		'Economics',
		'Geography',
		'History',
		'Indian Society',
		'Physics',
		'Politics',
		'Science',
	]
	return (
		<div
			onClick={closeModal}
			className='w-screen h-screen bg-custom-black bg-opacity-80 text-custom-white flex items-center justify-center relative z-[100] overflow-clip'>
			<div className='relative rounded-[20px]  bg-custom-gray p-10'>
				<button
					onClick={closeModal}
					className='absolute right-5 top-5 p-2 rounded-full cursor-pointer bg-custom-white bg-opacity-[12%]'>
					<CloseLineIcon className='w-[18px] h-[18px]' />
				</button>
				<h2 className='font-semibold text-[26px] text-center pb-8'>
					Welcom to{' '}
					<span className='text-custom-green'>Doubtss.com</span> 🎉
				</h2>
				<div className='bg-custom-black bg-opacity-100 rounded-2xl py-8 '>
					<h4 className='font-semibold text-lg px-8  pb-[18px]'>
						This platform is under development!
					</h4>
					<ul className='list-disc list-inside text-sm font-normal leading-[18px] pt-[18px] px-8 border-t border-custom-white border-opacity-[12%]'>
						<li>
							There might be instances where answers aren&apos;t
							displayed or seem inconsistent.
						</li>
						<li>
							If you experience issues, click
							&quot;Regenerate&quot; to refresh.
						</li>
						<li>
							We value your feedback; please share suggestions or
							concerns via the in-app feedback box.
						</li>
						<li>
							While we aim for accuracy, always double-check
							crucial information independently.
						</li>
					</ul>
				</div>
				<div className='bg-custom-black bg-opacity-100 rounded-2xl py-8 mt-4'>
					<h4 className='font-semibold text-lg px-8  pb-[18px] '>
						Subjects and books involved?
					</h4>
					<ul className='list-disc list-inside text-sm font-normal leading-[18px] pt-[18px] px-8 border-t border-custom-white border-opacity-[12%]'>
						<li>
							At the moment doubtss.com can provides answers and
							insights on the following UPSCE subjects:
						</li>
						<div className='flex flex-wrap gap-1 mt-[6px] mb-3 px-3'>
							{subjects.map((sub, index) => (
								<div
									key={index}
									className='bg-custom-white bg-opacity-20 py-[3.5px] px-[10px] rounded-md'>
									{sub}
								</div>
							))}
						</div>
						<li>
							We are actively working to expand this list and will
							be adding more subjects soon.
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
