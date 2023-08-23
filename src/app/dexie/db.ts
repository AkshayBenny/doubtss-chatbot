import Dexie from 'dexie'

interface User {
	email: string
	name: string
}

interface Message {
	id?: number
	userEmail: string
	role: string
	content: string
	createdAt: string
	type: 'question' | 'summary' | 'genq'
}

class ChatDatabase extends Dexie {
	users: Dexie.Table<User, string> // string is the type of the primary key (email)
	messages: Dexie.Table<Message, number>

	constructor() {
		super('ChatDatabase')

		// Define tables and indexes
		this.version(1).stores({
			users: 'email, name', // Set email as the primary key
			messages: '++id, userEmail, role, content, createdAt',
		})

		// Define tables
		this.users = this.table('users')
		this.messages = this.table('messages')
	}
}

export const db = new ChatDatabase()
