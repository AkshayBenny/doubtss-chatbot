import { atom } from 'recoil'

// Define the message types
type Message = {
	role: 'human' | 'bot'
	content: string
	id: number
	type: 'question' | 'summary' | 'genq'
	createdAt?: string
	userEmail?: string
}

type User = {
	email: string
	name: string
	image: string
}
type ChatType = 'summary' | 'question'
// Define the chat history type as an array of Message objects
type ChatHistory = Message[]

// Define the chatHistory atom
export const chatHistory = atom<ChatHistory>({
	key: 'chatHistory',
	default: [], // Default is an empty array
})

export const userData = atom<User>({
	key: 'userData',
	default: {
		name: '',
		email: '',
		image: '',
	},
})

export const chatType = atom<ChatType>({
	key: 'chatType',
	default: 'summary',
})

export const showClearChatModal = atom({
	key: 'showClearChatModal',
	default: false,
})
