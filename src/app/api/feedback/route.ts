import { getServerSession } from 'next-auth'
import { options } from '../auth/[...nextauth]/options'
import { NextResponse } from 'next/server'
import prisma from '@/app/db/prisma'

export async function POST(req: Request) {
	const { feedback } = await req.json()

	const session = await getServerSession(options)

	if (!feedback || !session) {
		return NextResponse.json({ success: false })
	}

	try {
		await prisma.feedback.create({
			data: {
				content: feedback,
				userId: (session.user as any).id,
			},
		})
		return NextResponse.json({ success: true })
	} catch (error) {
		return NextResponse.json({ success: false, error: error })
	}
}
