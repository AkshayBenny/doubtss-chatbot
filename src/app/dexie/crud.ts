import { db } from './db'

interface Message {
	id?: number
	role: string
	content: string
	type: 'question' | 'summary' | 'genq' | 'loading'
	createdAt: string
}

export const addMessageDexie = async (message: Message) => {
	await db.messages.add(message)
}

export const getAllMessagesDexie = async (): Promise<Message[]> => {
	return await db.messages.toArray()
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
	const message = await db.messages.get(id)

	if (message) {
		message.content += contentToAppend
		await db.messages.update(id, { content: message.content })
	} else {
		console.error(`Message with ID ${id} not found.`)
		throw new Error(`Message with ID ${id} not found.`)
	}
}

export const deleteMessageByIdDexie = async (id: number) => {
	await db.messages.delete(id)
}

export const deleteAllLoadingMessagesDexie = async () => {
	await db.messages.where('type').equals('loading').delete()
}

export const deleteAllMessagesDexie = async () => {
	await db.messages.clear()
}
