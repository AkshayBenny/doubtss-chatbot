import { db } from './db'

const addMessage = async (
	userId: number,
	role: string,
	content: string,
	createdAt: string
) => {
	await db.messages.add({ userId, role, content, createdAt })
}

const getMessages = async (userId: number) => {
	return await db.messages.where('userId').equals(userId).toArray()
}

const updateMessage = async (
	id: number,
	role: string,
	content: string,
	createdAt: string
) => {
	await db.messages.update(id, { role, content, createdAt })
}

const deleteMessage = async (id: number) => {
	await db.messages.delete(id)
}

export { getMessages, addMessage, updateMessage, deleteMessage }
