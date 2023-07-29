import Chatbox from './Chatbox'
import ArrowRightLineIcon from 'remixicon-react/ArrowRightLineIcon'

export default function Chat() {
	return (
		<div className='w-full h-full text-custom-white flex flex-col items-center justify-center'>
			<div className='relative w-fit mb-10'>
				<p className='font-normal text-[11px] w-fit p-[6px] rounded-[4px] bg-custom-light-gray absolute right-0 top-[-20px] text-opacity-80 scale-90'>
					Experimental
				</p>
				<h3 className='text-custom-green font-bold text-[40px]'>
					Doubtss.com
				</h3>
			</div>
			<Chatbox />

			{/* suggestions */}
			<div className='grid grid-cols-3 mt-[60px] gap-[24.5px] max-w-[770px]'>
				<button className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px]'>
					<p>Try an example</p>
					<ArrowRightLineIcon className='w-[18px] h-[18px]' />
				</button>
				<button className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px] text-left'>
					How did the Industrial Revolution impact economy in Europe &
					North America?
				</button>
				<button className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px] text-left'>
					What are the main factors that led to the decline of the
					Indus Valley Civilisation?
				</button>
			</div>
		</div>
	)
}
