import { atom } from 'recoil'

// Define the message types
type Message = { bot?: string; human?: string; id: number }
type ChatType = 'Summary' | 'Question'
// Define the chat history type as an array of Message objects
type ChatHistory = Message[]

// Define the chatHistory atom
export const chatHistory = atom<ChatHistory>({
	key: 'chatHistory',
	default: [], // Default is an empty array
})

export const userData = atom({
	key: 'userData',
	default: {},
})

export const chatType = atom<ChatType>({
	key: 'chatType',
	default: 'Summary',
})
