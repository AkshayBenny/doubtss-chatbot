import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '@/app/db/prisma'

export async function POST(req: Request) {
	const { feedback } = await req.json()

	if (!feedback) {
		return NextResponse.json({ success: false })
	}

	try {
		await prisma.feedback.create({
			data: {
				content: feedback,
				userId: '100000000',
			},
		})
		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ success: false, error: error })
	}
}
