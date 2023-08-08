import prisma from '@/app/db/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { user_clerk_id, email, isUser, content } = await req.json()
		if (!user_clerk_id || !email || !content) {
			return NextResponse.json({
				status: 'failure',
				message:
					'Missing user clerk id, email or message in request body',
			})
		}

		// Find the user by clerk ID
		const user = await prisma.user.findUnique({
			where: { user_clerk_Id: user_clerk_id },
		})

		if (!user) {
			return NextResponse.json({
				status: 'failure',
				message: 'No user found!',
			})
		}

		// Create a new message for the user
		await prisma.message.create({
			data: {
				content: content,
				isUser: isUser,
				userId: user_clerk_id,
			},
		})
	} catch (error) {
		console.error('Error in POST /api/create-message: ', error)
		return NextResponse.error()
	}
}
