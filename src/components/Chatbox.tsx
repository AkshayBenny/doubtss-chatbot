import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import SendPlane2FillIcon from 'remixicon-react/SendPlane2FillIcon'
export default function Chatbox() {
	return (
		<div className='flex items-center justify-center gap-3 w-full max-w-[770px]'>
			<select
				className='p-[15px] text-custom-green text-sm font-medium rounded-xl bg-custom-gray border border-white border-opacity-[36%] h-full'
				name='type'
				id='type'>
				<option value='summary'>Summary</option>
				<option value='question'>Question</option>
			</select>
			<div className='rounded-xl border border-white border-opacity-[36%] flex items-center justify-start gap-3 bg-custom-gray px-[15px] w-full'>
				<SearchLineIcon />
				<input
					type='text'
					className='bg-custom-gray py-[15px] ring-0 outline-none border-none focus:ring-0 focus:border-none focus:outline-none w-full'
				/>
			</div>
			<button className='p-[15px] text-custom-green text-sm font-medium rounded-xl bg-custom-gray border border-white border-opacity-[36%] h-full'>
				<SendPlane2FillIcon />
			</button>
		</div>
	)
}
