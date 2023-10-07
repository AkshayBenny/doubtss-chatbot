import { NextResponse } from 'next/server'
import prisma from '@/app/db/prisma'
export async function POST(req: Request): Promise<Response> {
	let body

	try {
		body = await req.json()
	} catch (error: any) {
		console.log('Error parsing json:', error.message)
		return NextResponse.json({
			success: false,
			message: 'Failed to parse the request body',
		})
	}

	const { mesageContent } = body

	if (!mesageContent) {
		return NextResponse.json({
			success: false,
			message: 'No content provided',
		})
	}
	try {
		await prisma.dislikedMessages.create({
			data: { content: mesageContent },
		})

		return NextResponse.json({
			success: true,
			message: 'Message content saved successfully',
		})
	} catch (error: any) {
		console.log(error.message)
		return NextResponse.json({ success: false, message: error.message })
	}
}
