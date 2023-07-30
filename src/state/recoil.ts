import { atom } from 'recoil'

// Define the message types
type Message = { bot?: string; human?: string }

// Define the chat history type as an array of Message objects
type ChatHistory = Message[]

// Define the chatHistory atom
export const chatHistory = atom<ChatHistory>({
	key: 'chatHistory',
	default: [], // Default is an empty array
})
