import prisma from '@/app/db/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { uid } = await req.json()

		if (!uid) {
			return NextResponse.json({
				status: 'failure',
				message: 'Missing user id in request body',
			})
		}

		// Find the user by ID
		const user = await prisma.user.findUnique({ where: { id: uid } })

		if (!user) {
			return NextResponse.json({
				status: 'failure',
				message: 'No user found!',
			})
		}

		// Delete all messages related to the user
		const deletedMessages = await prisma.message.deleteMany({
			where: {
				userId: uid,
			},
		})

		if (deletedMessages) {
			console.log('Messages successfully deleted!', deletedMessages)
		}

		return NextResponse.json({
			status: 'success',
			message: 'Deleted messages',
		})
	} catch (error) {
		console.error('Error in DELETE /api/delete-messages: ', error)
		return NextResponse.error()
	}
}
