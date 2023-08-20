'use client'

import Chatbox from './Chatbox'
import ArrowRightLineIcon from 'remixicon-react/ArrowRightLineIcon'
import Image from 'next/image'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { chatHistory, chatType, userData } from '@/state/recoil'
import { useRecoilState } from 'recoil'
import { useCompletion } from 'ai/react'
import axios from 'axios'
import FileCopyLineIcon from 'remixicon-react/FileCopyLineIcon'
import { useSession } from 'next-auth/react'
import { addMessageDexie } from '@/app/dexie/crud'

const questions = [
	'How did the Industrial Revolution impact economy in Europe & North America?',
	'What are the main factors that led to the decline of the Indus Valley Civilisation?',
]

export default function Chat({ userDataState }: any) {
	const { data: session, status } = useSession()
	const [chats, setChats] = useRecoilState(chatHistory)
	const [recoilChatType, setRecoilChatType] = useRecoilState(chatType)
	const [recoilUser, setRecoilUser] = useRecoilState(userData)
	let {
		completion,
		input,
		error,
		isLoading,
		handleInputChange,
		handleSubmit: handleAISubmit,
		stop,
		setInput,
		setCompletion,
	} = useCompletion({
		api: '/api/' + `chatgpt-${recoilChatType.toLowerCase()}`,
		headers: { name: 'Alex' },
		body: {
			isText: true,
			userId: session?.user.email || '',
			userName: session?.user.name || '',
		},
	})
	if (error) console.log('USECOMPLETION HOOK ERROR: ', error)
	if (completion) console.log(completion, '----------------completion')
	const addMessage = async (message: any) => {
		// if (session && recoilUser) {
		// 	try {
		// 		await axios.post(
		// 			'/api/create-message',
		// 			{
		// 				// @ts-ignore
		// 				uid: recoilUser?.id || '',
		// 				email: session?.user.email || '',
		// 				isUser: true,
		// 				content: message.human,
		// 			},
		// 			{
		// 				headers: {
		// 					'Content-Type': 'application/json',
		// 					Accept: 'application/json',
		// 				},
		// 			}
		// 		)
		// 	} catch (error) {
		// 		console.error(error)
		// 	}
		// }
		// setChats((oldChats) => {
		// 	const messageExists = oldChats.some(
		// 		(chat) => chat.id === message.id
		// 	)
		// 	if (messageExists) {
		// 		return oldChats
		// 	} else {
		// 		return [...oldChats, message]
		// 	}
		// })

		// addMessageDexie({})
		// restructure the objects for storing user data and messages

		setChats((oldChats) => [...oldChats, message])
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		handleAISubmit(e)
		addMessage({ role: 'human', content: input, id: Date.now() })
		setInput('')
	}

	useEffect(() => {
		if (userDataState) {
			setRecoilUser(userDataState)
			if (userDataState?.messages?.length > 0) {
				userDataState.messages.forEach((message: any) => {
					if (message.isUser) {
						addMessage({
							role: 'human',
							content: message.content,
							id: Date.now(),
						})
					} else {
						addMessage({
							role: 'bot',
							content: message.content,
							id: Date.now(),
						})
					}
				})
			}
		}
	}, [userDataState])

	useEffect(() => {
		const addBotMessage = async () => {
			if (completion && isLoading) {
				// if (session) {
				// 	try {
				// 		const { data } = await axios.post(
				// 			'/api/create-message',
				// 			{
				// 				// @ts-ignore
				// 				uid: recoilUser?.id || '',
				// 				email: session?.user.email || '',
				// 				isUser: false,
				// 				content: `${completion}`,
				// 			},
				// 			{
				// 				headers: {
				// 					'Content-Type': 'application/json',
				// 					Accept: 'application/json',
				// 				},
				// 			}
				// 		)
				// 	} catch (error) {
				// 		console.error(error)
				// 	}
				// }
				// Check if last message is by a human
				const lastMessage = chats[chats.length - 1]
				if (lastMessage && lastMessage.role === 'human') {
					addMessage({
						role: 'bot',
						content: completion,
						id: Date.now(),
					})
				}
			}
		}
		addBotMessage()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [completion, isLoading])

	return (
		<div className='w-full h-full text-custom-white flex flex-col items-center justify-center'>
			{chats.length === 0 ? (
				<>
					{/* FIRST CHAT */}
					<div className='relative w-fit mb-10'>
						<p className='font-normal text-[11px] w-fit p-[6px] rounded-[4px] bg-custom-light-gray absolute right-0 top-[-20px] text-opacity-80'>
							Experimental
						</p>
						<h3 className='text-custom-green font-bold text-[40px]'>
							Doubtss.com
						</h3>
					</div>
					<Chatbox
						handleSubmit={handleSubmit}
						input={input}
						handleInputChange={handleInputChange}
						isLoading={isLoading}
						completion={completion}
					/>
					{/* suggestions */}
					<div className='grid grid-cols-3 mt-[60px] gap-[24.5px] max-w-[770px]'>
						<div className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px]'>
							<p>Try an example</p>
							<ArrowRightLineIcon className='w-[18px] h-[18px]' />
						</div>
						<form onSubmit={handleSubmit}>
							<button
								onClick={() => {
									setInput(questions[0])
								}}
								className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px] text-left hover:bg-custom-light-gray transition'>
								{questions[0]}
							</button>
						</form>
						<form onSubmit={handleSubmit}>
							<button
								onClick={() => {
									setInput(questions[1])
								}}
								className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px] text-left hover:bg-custom-light-gray transition'>
								{questions[1]}
							</button>
						</form>
					</div>
				</>
			) : (
				<>
					{/* CHAT CONTINUATION */}
					<div className='text-custom-white text-sm font-normal w-full h-full overflow-y-scroll'>
						{chats.map((chat, index) => {
							const isBot = chat.role === 'bot' ? true : false

							return (
								<div
									key={index}
									className={`w-full ${
										isBot
											? 'bg-white bg-opacity-5'
											: 'bg-custom-black'
									}`}>
									<div
										className={`flex items-start justify-start gap-4 text-left  max-w-[770px] mx-auto p-7`}>
										{session && (
											<Image
												height={32}
												width={32}
												src={
													isBot
														? '/rosie.png'
														: session?.user.image
												}
												alt='Avatar'
												className='rounded-full'
											/>
										)}

										{/* <p className='leading-normal mt-2'>
												{chat.content}
											</p> */}
										<p
											className='leading-normal'
											style={{
												whiteSpace: 'pre-wrap',
											}}>
											{chat.content}
										</p>
									</div>
								</div>
							)
						})}
					</div>

					<div className='w-full flex items-center justify-center pt-7 pb-6 '>
						<Chatbox
							handleSubmit={handleSubmit}
							input={input}
							handleInputChange={handleInputChange}
							isLoading={isLoading}
							completion={completion}
						/>
					</div>
				</>
			)}
		</div>
	)
}
