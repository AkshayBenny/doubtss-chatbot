import Alert from './Alert'
import Options from './Options'

export default function Navbar() {
	return (
		<div className='flex items-center justify-between px-[39px] py-[32px] fixed top-0 left-0 w-full'>
			<Options />

			<Alert />
		</div>
	)
}
