import Image from 'next/image'

export default function AuthButton({
	img,
	name,
}: {
	img: string
	name: string
}) {
	return (
		<button className='flex items-center justify-center text-sm font-medium gap-3 px-5 py-[15px] w-full auth-btn'>
			<Image
				src={img}
				height={18}
				width={18}
				alt={`${name} logo`}
			/>
			<p>Continue with {name}</p>
		</button>
	)
}
