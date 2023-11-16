import { atom } from 'recoil'

// Define the message types
export type Message = {
	role: 'human' | 'bot'
	content: string
	id: number
	type: 'question' | 'summary' | 'genq' | 'loading'
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
		name: 'John Doe',
		email: 'johndoe@gmail.com',
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

export const showFAQModal = atom({
	key: 'showFAQModal',
	default: false,
})

export const showFeedbackSubmitConfirmation = atom({
	key: 'showFeedbackSubmitConfirmation',
	default: false,
})

export const welcomeModal = atom({
	key: 'welcomeModal',
	default: false,
})

export const queryAction = atom({
	key: 'querying',
	default: false,
})
