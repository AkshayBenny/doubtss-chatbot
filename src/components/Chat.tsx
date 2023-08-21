'use client'

import Chatbox from './Chatbox'
import ArrowRightLineIcon from 'remixicon-react/ArrowRightLineIcon'
import Image from 'next/image'
import { useEffect } from 'react'
import { chatHistory, chatType, userData } from '@/state/recoil'
import { useRecoilState } from 'recoil'
import { useCompletion } from 'ai/react'
import { useSession } from 'next-auth/react'
import { addMessageDexie, getMessagesByUserEmailDexie } from '@/app/dexie/crud'

const questions = [
	'How did the Industrial Revolution impact economy in Europe & North America?',
	'What are the main factors that led to the decline of the Indus Valley Civilisation?',
]

export default function Chat({ userSessionData }: any) {
	console.log('userSessionData', userSessionData)
	const [chats, setChats] = useRecoilState(chatHistory)
	const [recoilChatType, setRecoilChatType] = useRecoilState(chatType)
	const [recoilUserState, setRecoilUserState] = useRecoilState(userData)

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
			userId: userSessionData?.user.email || '',
			userName: userSessionData?.user.name || '',
		},
	})

	if (error) console.log('USECOMPLETION HOOK ERROR: ', error)

	const addMessage = async (message: any) => {
		setChats((oldChats) => [...oldChats, message])
		const dixieMessage = {
			...message,
			userEmail: userSessionData.user.email,
			createdAt: new Date(),
		}
		addMessageDexie(dixieMessage)
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		handleAISubmit(e)
		addMessage({ role: 'human', content: input, id: Date.now() })
		setInput('')
	}

	useEffect(() => {
		if (userSessionData) {
			setRecoilUserState(userSessionData.user)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userSessionData])

	useEffect(() => {
		const updateHistory = async () => {
			if (userSessionData?.user.email) {
				const chatHistory = await getMessagesByUserEmailDexie(
					userSessionData?.user.email
				)

				console.log('ChatHistory: ', chatHistory)

				chatHistory.length > 0 &&
					chatHistory.map((history) => {
						let oldMessage: any = {
							role: history.role,
							content: history.content,
							id: history.id,
						}
						setChats((oldChats) => [...oldChats, oldMessage])
					})
			}
		}
		updateHistory()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userSessionData])

	useEffect(() => {
		const addBotMessage = async () => {
			if (completion && isLoading) {
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
						setInput={setInput}
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
										className={`flex items-start justify-start gap-4 text-left  max-w-[770px] mx-auto  ${
											!isBot && index === 0
												? 'pt-[40px] px-7 pb-7'
												: 'p-7'
										}`}>
										{recoilUserState && (
											<Image
												height={32}
												width={32}
												src={
													isBot
														? '/doubtss-pfp.svg'
														: recoilUserState?.image
												}
												alt='Avatar'
												className='rounded-full'
											/>
										)}

										<p
											className={`leading-normal !whitespace-pre-wrap ${
												!isBot && 'pt-[4px]'
											}`}
											style={{ whiteSpace: 'pre-line' }}>
											{chat.content}
										</p>
									</div>
								</div>
							)
						})}
					</div>

					<div className='w-full flex items-center justify-center pt-7 pb-6 '>
						<Chatbox
							continuation={chats?.length > 0 ? true : false}
							handleSubmit={handleSubmit}
							input={input}
							setInput={setInput}
							isLoading={isLoading}
							completion={completion}
						/>
					</div>
				</>
			)}
		</div>
	)
}
