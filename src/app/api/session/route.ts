import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { options } from '../auth/[...nextauth]/options'

export async function GET(request: Request) {
	const session = await getServerSession(options)

	if (!session) {
		return new NextResponse(
			JSON.stringify({
				status: 'fail',
				message: 'You are not logged in',
			}),
			{ status: 401 }
		)
	}

	return NextResponse.json({
		authenticated: !!session,
		session,
	})
}
