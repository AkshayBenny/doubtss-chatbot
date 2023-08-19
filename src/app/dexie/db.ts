import Dexie from 'dexie'

interface User {
	id?: number
	name: string
	email: string
}

interface Message {
	id?: number
	userId: number
	role: string
	content: string
	createdAt: string
}

class ChatDatabase extends Dexie {
	users: Dexie.Table<User, number> // number is the type of the primary key
	messages: Dexie.Table<Message, number>

	constructor() {
		super('ChatDatabase')

		// Define tables and indexes
		this.version(1).stores({
			users: '++id, name, email',
			messages: '++id, userId, role, content, createdAt',
		})

		// Define tables
		this.users = this.table('users')
		this.messages = this.table('messages')
	}
}

export const db = new ChatDatabase()
