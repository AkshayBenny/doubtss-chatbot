'use client'

import Chatbox from './Chatbox'
import ArrowRightLineIcon from 'remixicon-react/ArrowRightLineIcon'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { chatHistory, chatType, userData } from '@/state/recoil'
import { useRecoilState } from 'recoil'
import { useCompletion } from 'ai/react'
import {
	addMessageDexie,
	appendToMessageDexie,
	getMessagesByUserEmailDexie,
	updateMessageDexie,
} from '@/app/dexie/crud'
import FileCopyLineIcon from 'remixicon-react/FileCopyLineIcon'
import ThumbUpLineIcon from 'remixicon-react/ThumbUpLineIcon'
import ThumbDownLineIcon from 'remixicon-react/ThumbDownLineIcon'
import RefreshLineIcon from 'remixicon-react/RefreshLineIcon'
import SpeedMiniLineIcon from 'remixicon-react/SpeedMiniLineIcon'
import axios from 'axios'

const questions = [
	'How did the Industrial Revolution impact economy in Europe & North America?',
	'What are the main factors that led to the decline of the Indus Valley Civilisation?',
]

export default function Chat({ userSessionData }: any) {
	const [chats, setChats] = useRecoilState(chatHistory)
	const [recoilChatType, setRecoilChatType] = useRecoilState(chatType)
	const [recoilUserState, setRecoilUserState] = useRecoilState(userData)
	const [isCopied, setIsCopied] = useState(false)
	const [text, setText] = useState('')
	const [continueLoading, setContinueLoading] = useState(false)
	const [regenLoading, setRegenLoading] = useState(false)
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

	const handleCopyClick = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setIsCopied(true)
		})
	}

	const handleContinueGenerating = async (
		messageId: number,
		text: string
	) => {
		setContinueLoading(true)
		setText(text)
		const { data } = await axios.post('/api/chatgpt-continue', {
			prompt: text,
			userId: userSessionData?.user.email || '',
			userName: userSessionData?.user.name || '',
		})

		// Update the message in the Dexie DB
		await appendToMessageDexie(messageId, data)

		// Find the message in the chats array and update it
		setChats((prevChats) => {
			return prevChats.map((chat) => {
				if (chat.id === messageId) {
					return {
						...chat,
						content: data, // Assuming the response data is the updated content
					}
				}
				return chat
			})
		})
		setContinueLoading(false)
	}

	const handleRegenerate = async (messageId: number, text: string) => {
		setRegenLoading(true)
		setText(text)
		const { data } = await axios.post('/api/chatgpt-regenerate', {
			prompt: text,
			userId: userSessionData?.user.email || '',
			userName: userSessionData?.user.name || '',
		})

		// Update the message in the Dexie DB
		await appendToMessageDexie(messageId, data)

		// Find the message in the chats array and update it
		setChats((prevChats) => {
			return prevChats.map((chat) => {
				if (chat.id === messageId) {
					return {
						...chat,
						content: data, // Assuming the response data is the updated content
					}
				}
				return chat
			})
		})
		setRegenLoading(false)
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
						<button
							onClick={() => {
								setInput(questions[0])
							}}
							className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px] text-left hover:bg-custom-light-gray transition'>
							{questions[0]}
						</button>
						<button
							onClick={() => {
								setInput(questions[1])
							}}
							className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px] text-left hover:bg-custom-light-gray transition'>
							{questions[1]}
						</button>
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

										<div className='flex flex-col items-start justify-start'>
											<p
												className={`leading-normal !whitespace-pre-wrap ${
													!isBot && 'pt-[4px]'
												}`}
												style={{
													whiteSpace: 'pre-line',
												}}>
												{chat.content}
											</p>
											{isBot && (
												<div className='pt-[20px] flex gap-[8px]'>
													<button
														onClick={() =>
															handleCopyClick(
																chat.content
															)
														}
														className='flex items-center justify-center p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer'>
														<FileCopyLineIcon className='h-[16px] w-[16px] text-custom-white' />
													</button>
													<button className='flex items-center justify-center p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer'>
														<ThumbUpLineIcon className='h-[16px] w-[16px] text-custom-white' />
													</button>
													<button className='flex items-center justify-center p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer'>
														<ThumbDownLineIcon className='h-[16px] w-[16px] text-custom-white' />
													</button>
													<button
														onClick={() =>
															handleRegenerate(
																chat.id,
																chat.content
															)
														}
														className='flex items-center justify-center gap-[6px] p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer group'>
														<RefreshLineIcon
															className={`h-[16px] w-[16px] text-custom-white ${
																regenLoading &&
																'animate-spin'
															}`}
														/>
														<p className='font-medium text-xs'>
															Regenerate
														</p>
													</button>
													<button
														onClick={() =>
															handleContinueGenerating(
																chat.id,
																chat.content
															)
														}
														className='flex items-center justify-center gap-[6px] p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer group'>
														<SpeedMiniLineIcon
															className={`h-[16px] w-[16px] text-custom-white ${
																continueLoading &&
																'animate-pulse'
															}`}
														/>
														<p className='font-medium text-xs'>
															Continue Generating
														</p>
													</button>
												</div>
											)}
										</div>
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
