import prisma from '@/app/db/prisma'

export const getUserMessages = async (userClerkId: string) => {
	return await prisma.message.findMany({
		where: { user: { user_clerk_Id: userClerkId } },
	})
}
