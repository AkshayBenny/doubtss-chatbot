// @ts-nocheck
import prisma from '../db/prisma'

export default function ChatPage() {
	return <div>Hello world</div>
}
export const getStaticProps = async () => {
	const feed = await prisma.message.findMany({
		include: {
			user: {
				select: { email: true },
			},
		},
	})
	return {
		props: { feed },
		revalidate: 10,
	}
}
