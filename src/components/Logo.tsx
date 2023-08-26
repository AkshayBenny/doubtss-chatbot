export default function Logo({ type }: { type: 'xl' | 'md' | 'sm' }) {
	return (
		<div className='relative w-fit'>
			<p className='font-normal text-[11px] w-fit p-[6px] rounded-[4px] bg-custom-light-gray absolute right-0 top-[-20px] text-white text-opacity-80 scale-90'>
				Experimental
			</p>
			<h3 className='text-custom-green font-bold text-[40px]'>
				Doubtss.com
			</h3>
		</div>
	)
}
