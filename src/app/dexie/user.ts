import { db } from './db'

const addUser = async (name: string, email: string) => {
	await db.users.add({ name, email })
}

const getUser = async (id: number) => {
	return await db.users.get(id)
}

const updateUser = async (id: number, name: string, email: string) => {
	await db.users.update(id, { name, email })
}

const deleteUser = async (id: number) => {
	await db.messages.where('userId').equals(id).delete()
	await db.users.delete(id)
}

export { addUser, getUser, updateUser, deleteUser }
