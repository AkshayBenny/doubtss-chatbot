import prisma from '@/app/db/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { uid, email, isUser, content } = await req.json()

		if (!uid || !email || !content) {
			return NextResponse.json({
				status: 'failure',
				message: 'Missing user id, email or message in request body',
			})
		}

		// Find the user by clerk ID
		const user = await prisma.user.findUnique({
			where: { id: uid },
			include: { messages: { take: 1, orderBy: { createdAt: 'desc' } } }, // Include the latest message
		})

		if (!user) {
			return NextResponse.json({
				status: 'failure',
				message: 'No user found!',
			})
		}

		// Check if the latest message has the same isUser value
		const latestMessage = user.messages[0]
		if (latestMessage && latestMessage.isUser === isUser) {
			return NextResponse.json({
				status: 'failure',
				message:
					'The new message must have an alternating isUser value.',
			})
		}

		// Create a new message for the user
		const createdMessage = await prisma.message.create({
			data: {
				content: content,
				isUser: isUser,
				userId: uid,
			},
		})

		if (createdMessage)
			console.log('Message successfully created!', createdMessage)

		return NextResponse.json({
			status: 'success',
			message: 'Created message',
		})
	} catch (error) {
		console.error('Error in POST /api/create-message: ', error)
		return NextResponse.error()
	}
}
