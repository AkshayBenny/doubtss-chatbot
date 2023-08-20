import { db } from './db'

interface User {
	name: string
	email: string
}

interface Message {
	id?: number
	role: string
	userEmail: string
	content: string
	createdAt: string
}

export const addUserDexie = async (user: User) => {
	await db.users.put(user) // Email is the key, so it will update if already exists
}

export const getUserByEmailDexie = async (
	email: string
): Promise<User | undefined> => {
	return await db.users.get(email)
}

export const deleteUserByEmailDexie = async (email: string) => {
	await db.users.delete(email)
}

// Message crud
export const addMessageDexie = async (message: Message) => {
	await db.messages.add(message)
}

export const getMessagesByUserEmailDexie = async (
	email: string
): Promise<Message[]> => {
	const user = await getUserByEmailDexie(email)
	if (user) {
		return await db.messages.where('userId').equals(user.email).toArray()
	}
	return []
}

export const updateMessageDexie = async (
	id: number,
	updatedMessage: Partial<Message>
) => {
	await db.messages.update(id, updatedMessage)
}

export const deleteMessageByIdDexie = async (id: number) => {
	await db.messages.delete(id)
}
