'use client'
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import firebase_app from '@/app/firebase/config'

// Initialize Firebase auth instance
const auth = getAuth(firebase_app)

// Create the authentication context
export const AuthContext = createContext({})

// Custom hook to access the authentication context
export const useAuthContext = () => useContext(AuthContext)

interface AuthContextProviderProps {
	children: ReactNode
}

export function AuthContextProvider({
	children,
}: AuthContextProviderProps): JSX.Element {
	// Set up state to track the authenticated user and loading status
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	// Provide the authentication context to child components
	return <>{loading ? <div>Loading...</div> : children} </>
}
