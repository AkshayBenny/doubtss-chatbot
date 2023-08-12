import prisma from '@/app/db/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { user_clerk_id, email } = await req.json()
		if (user_clerk_id == null || '' || undefined) {
			return NextResponse.json({
				status: 'failure',
				message: 'Missing user clerk id in request body',
			})
		}

		// Check if a user with the given clerk ID already exists
		let user: any = await prisma.user.findUnique({
			where: { user_clerk_Id: user_clerk_id },
			include: { messages: { orderBy: { createdAt: 'asc' } } },
		})

		if (!user) {
			// If the user doesn't exist, create a new one
			user = await prisma.user.create({
				data: {
					user_clerk_Id: user_clerk_id,
					email: email,
				},
			})
		}

		let json_response = {
			status: 'success',
			data: {
				user: user,
			},
		}

		return NextResponse.json(json_response)
	} catch (error: any) {
		console.error('Error in POST /api/create-or-update: ', error)
		return NextResponse.error()
	}
}
