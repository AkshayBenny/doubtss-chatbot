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
		return await db.messages.where('userEmail').equals(user.email).toArray()
	}
	return []
}

export const updateMessageDexie = async (
	id: number,
	updatedMessage: Partial<Message>
) => {
	await db.messages.update(id, updatedMessage)
}

export const appendToMessageDexie = async (
	id: number,
	contentToAppend: string
) => {
	// Get the message by ID
	const message = await db.messages.get(id)

	// If the message is found, append the content and update the message
	if (message) {
		message.content += contentToAppend // Appending the content
		await db.messages.update(id, { content: message.content })
	} else {
		console.error(`Message with ID ${id} not found.`)
		throw new Error(`Message with ID ${id} not found.`)
	}
}

export const deleteMessageByIdDexie = async (id: number) => {
	await db.messages.delete(id)
}

export const deleteAllMessagesByUserEmailDexie = async (email: string) => {
	await db.messages.where('userEmail').equals(email).delete()
}
