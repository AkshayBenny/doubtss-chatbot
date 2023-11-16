import Dexie from 'dexie'

interface Message {
	id?: number
	role: string
	content: string
	createdAt: string
	type: 'question' | 'summary' | 'genq' | 'loading'
}

class ChatDatabase extends Dexie {
	messages: Dexie.Table<Message, number>

	constructor() {
		super('ChatDatabase')

		this.version(3).stores({
			messages: '++id, role, content, createdAt, type',
		})

		// Define tables
		this.messages = this.table('messages')
	}
}

export const db = new ChatDatabase()
