import { NextResponse } from 'next/server'
import prisma from '@/app/db/prisma'

export async function POST(req: Request): Promise<NextResponse> {
	let body

	try {
		body = await req.json()
	} catch (error) {
		console.error('Error parsing JSON:', error)
		return NextResponse.json({
			success: false,
			message: 'Failed to parse request body',
		})
	}

	const { messageContent } = body

	if (!messageContent) {
		return NextResponse.json({
			success: false,
			message: 'No content provided',
		})
	}

	try {
		await prisma.likedMessages.create({
			data: { content: messageContent },
		})
		return NextResponse.json({
			success: true,
			message: 'Message content saved successfully',
		})
	} catch (error: any) {
		console.error(error.message)
		return NextResponse.json({ success: false, message: error.message })
	}
}
