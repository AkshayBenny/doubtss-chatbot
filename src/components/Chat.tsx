'use client'

import Chatbox from './Chatbox'
import ArrowRightLineIcon from 'remixicon-react/ArrowRightLineIcon'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
	Message,
	chatHistory,
	chatType,
	showClearChatModal,
	showFAQModal,
	showFeedbackSubmitConfirmation,
	userData,
	welcomeModal,
} from '@/state/recoil'
import { useRecoilState } from 'recoil'
import { useCompletion } from 'ai/react'
import {
	addMessageDexie,
	appendToMessageDexie,
	getMessagesByUserEmailDexie,
} from '@/app/dexie/crud'
import FileCopyLineIcon from 'remixicon-react/FileCopyLineIcon'
import ThumbUpLineIcon from 'remixicon-react/ThumbUpLineIcon'
import ThumbDownLineIcon from 'remixicon-react/ThumbDownLineIcon'
import RefreshLineIcon from 'remixicon-react/RefreshLineIcon'
import SpeedMiniLineIcon from 'remixicon-react/SpeedMiniLineIcon'
import axios from 'axios'
import StopLineIcon from 'remixicon-react/StopLineIcon'

// @ts-ignore
import Identicon from 'react-identicons'
import ClearChatModal from './ClearChatModal'
import FeedbackModal from './FeedbackModal'

import EditLineIcon from 'remixicon-react/EditLineIcon'
import { logEvent } from '@/app/utils/analytics'
import ConfirmFeedbackSubmission from './ConfirmFeedbackSubmission'
import Modal from './Modal'
import { useRouter } from 'next/navigation'

const questions = [
	'How did the Industrial Revolution impact economy in Europe & North America?',
	'What are the main factors that led to the decline of the Indus Valley Civilisation?',
]

function formatContent(content: string) {
	return content
		.replace(/\\n/g, '\n')
		.replace(/\\"/g, '"')
		.replace(/\\'/g, "'")
		.replace(/^"/, '')
		.replace(/"$/, '')
}

function cleanString(filename: string) {
	const baseName = filename.replace(/\.[^/.]+$/, '')
	const cleanedString = baseName.replace(/[^a-zA-Z0-9 ]/g, '')
	return cleanedString
}

function pushBeforeDelimitter(first: string, second: any) {
	const firstContent = first.split('$$$')[0].replace('"', ' ') + '\n\n'
	const referredFromContent = first.split('$$$')[1]

	return firstContent + second + '$$$' + referredFromContent
}

export default function Chat({ userSessionData }: any) {
	const chatEndRef = useRef(null)
	const router = useRouter()
	const [chats, setChats] = useRecoilState(chatHistory)
	const [showFaqModal, setShowFaqModal] = useRecoilState(showFAQModal)
	const [recoilChatType, setRecoilChatType] = useRecoilState(chatType)
	const [recoilUserState, setRecoilUserState] = useRecoilState(userData)
	const [isCopied, setIsCopied] = useState(false)
	const [text, setText] = useState('')
	const [continueLoading, setContinueLoading] = useState<any>({})
	const [regenLoading, setRegenLoading] = useState<any>({})
	const [clearChatModal, setClearChatModal] =
		useRecoilState(showClearChatModal)
	const [generateQuestionLoading, setGenerateQuestionLoading] =
		useState(false)
	const [showWelcomeModal, setShowWelcomeModal] = useState(false)
	console.log('showWelcomeModal', showWelcomeModal)
	const [
		recoilSubmitConfimationFeedback,
		setRecoilSubmitConfirmationFeedbacl,
	] = useRecoilState(showFeedbackSubmitConfirmation)

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

	const editHandler = (chat: any) => setInput(chat.content)

	const scrollToBottom = () => {
		try {
			chatEndRef &&
				chatEndRef.current &&
				// @ts-expect-error
				chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		} catch (error: any) {
			console.error(error.message)
		}
	}

	const closeWelcomeModal = () => {
		setShowWelcomeModal(false)
		localStorage.setItem('recentSignin', 'False')
	}

	const addMessage = async (message: any) => {
		setChats((oldChats) => [
			...oldChats,
			{
				...message,
				type: recoilChatType,
			},
		])

		const dixieMessage = {
			...message,
			userEmail: userSessionData.user.email,
			type: recoilChatType,
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

	const likeOrDislikeHandler = async (type: any, chat: any) => {
		try {
			await axios.post(
				`/api/${type === 'like' ? 'like' : 'dislike'}`,
				{
					messageContent: chat.content,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				}
			)
		} catch (error) {
			console.log(error)
		}
	}

	const handleContinueGenerating = async (
		messageId: number,
		text: string
	) => {
		setContinueLoading({
			...continueLoading,
			[messageId]: true,
		})

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
					console.log(chat)
					return {
						...chat,
						content: pushBeforeDelimitter(chat.content, data), // Assuming the response data is the updated content
					}
				}
				return chat
			})
		})
		setContinueLoading({
			...continueLoading,
			[messageId]: false,
		})
	}

	const handleRegenerate = async (messageId: number, text: string) => {
		setRegenLoading({
			...regenLoading,
			[messageId]: true,
		})
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
		setRegenLoading({
			...regenLoading,
			[messageId]: false,
		})
	}

	const generateQuestion = async (messageId: number, text: string) => {
		setGenerateQuestionLoading(true)
		setText(text)
		const { data } = await axios.post('/api/chatgpt-genq', {
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
						content: pushBeforeDelimitter(chat.content, data), // Assuming the response data is the updated content
					}
				}
				return chat
			})
		})
		setGenerateQuestionLoading(true)
	}

	useEffect(() => {
		scrollToBottom()
	}, [chats])

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

	useEffect(() => {
		const recentSigninValue = localStorage.getItem('recentSignin')
		if (recentSigninValue && recentSigninValue === 'True')
			setShowWelcomeModal(true)
	}, [])

	return (
		<div className='w-full h-full text-custom-white flex flex-col items-center justify-center '>
			{showWelcomeModal && (
				<div className='absolute z-[40]'>
					<Modal closeModal={closeWelcomeModal} />
				</div>
			)}
			{showFaqModal && (
				<>
					<div className='absolute w-screen h-screen z-[40] bg-black bg-opacity-80'></div>
					<FeedbackModal />
				</>
			)}
			{recoilSubmitConfimationFeedback && (
				<>
					<div className='absolute w-screen h-screen z-[40] bg-black bg-opacity-80'></div>
					<ConfirmFeedbackSubmission />
				</>
			)}
			{chats.length === 0 ? (
				<div>
					{/* FIRST CHAT */}
					<div className='relative w-fit mb-10 mx-auto'>
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
								logEvent('Example', 'Example_1')
								setInput(questions[0])
							}}
							className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px] text-left hover:bg-custom-light-gray transition'>
							{questions[0]}
						</button>
						<button
							onClick={() => {
								logEvent('Example', 'Example_1')
								setInput(questions[1])
							}}
							className='text-custom-white text-sm flex items-center justify-center gap-2 border border-custom-white border-opacity-[12%] rounded-xl py-[19px] px-[15px] text-left hover:bg-custom-light-gray transition'>
							{questions[1]}
						</button>
					</div>
				</div>
			) : (
				<>
					{clearChatModal && <ClearChatModal stop={stop} />}
					{/* CHAT CONTINUATION */}
					<div className='text-custom-white text-sm font-normal w-full h-full overflow-y-scroll relative z-50'>
						{chats.map((chat, index) => {
							const formattedChatMessage = formatContent(
								chat.content
							)
							const chatMessage =
								formattedChatMessage.split('$$$')[0]
							const referredFrom =
								formattedChatMessage.split('$$$').length > 0 &&
								formattedChatMessage.split('$$$')[1]

							const isBot = chat.role === 'bot' ? true : false

							return (
								<div
									key={index}
									className={`w-full  ${
										isBot
											? 'bg-white bg-opacity-5'
											: 'bg-custom-black'
									}`}>
									<div
										className={`group flex items-start justify-start gap-4 text-left  max-w-[770px] mx-auto  ${
											!isBot && index === 0
												? 'pt-[40px]  pb-7'
												: 'py-7'
										}`}>
										{recoilUserState &&
											(isBot ? (
												<Image
													height={32}
													width={32}
													src='/doubtss-pfp.svg'
													alt='Avatar'
													className='rounded-full'
												/>
											) : (
												<Identicon
													string={
														recoilUserState.name
													}
													size={32}
													className='rounded-full'
												/>
											))}

										<div className='flex flex-col items-start justify-start w-full '>
											<div className='flex items-center justify-between w-full'>
												<div
													className={`whitespace-pre-line leading-normal  ${
														!isBot && 'pt-[4px]'
													}`}
													style={{
														whiteSpace: 'pre-line',
													}}>
													<p>
														{formatContent(
															chatMessage
														)}
													</p>
													{formattedChatMessage.split(
														'$$$'
													).length > 0 &&
														referredFrom && (
															<p className='text-sm font-normal italic text-custom-white text-opacity-80 pt-[20px]'>
																Referred from:{' '}
																{cleanString(
																	referredFrom
																)}
															</p>
														)}
												</div>
												{!isBot && (
													<button
														onClick={() =>
															editHandler(chat)
														}
														className='relative z-20 group-hover:opacity-100  opacity-0 transition flex  items-center justify-center gap-[6px] p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer group'>
														<EditLineIcon
															className={`h-[16px] w-[16px] text-custom-white ${
																continueLoading[
																	chat.id
																] &&
																'animate-pulse'
															}`}
														/>
													</button>
												)}
											</div>
											{isBot && (
												<div
													key={index}
													className='pt-[20px] flex gap-[8px]'>
													<button
														onClick={() => {
															handleCopyClick(
																chat.content
															)
															logEvent(
																'Button Click',
																'Copy_button'
															)
														}}
														className='flex items-center justify-center p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer'>
														<FileCopyLineIcon className='h-[16px] w-[16px] text-custom-white' />
													</button>
													<button
														onClick={() => {
															likeOrDislikeHandler(
																'like',
																chat
															)
															logEvent(
																'Button Click',
																'like_button'
															)
														}}
														className='flex items-center justify-center p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer'>
														<ThumbUpLineIcon className='h-[16px] w-[16px] text-custom-white' />
													</button>
													<button
														onClick={() => {
															likeOrDislikeHandler(
																'dislike',
																chat
															)
															logEvent(
																'Button Click',
																'dislike_button'
															)
														}}
														className='flex items-center justify-center p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer'>
														<ThumbDownLineIcon className='h-[16px] w-[16px] text-custom-white' />
													</button>
													{chats.length - 1 ===
														index && (
														<>
															<button
																onClick={() => {
																	logEvent(
																		'Button Click',
																		'regenerate_button'
																	)
																	handleRegenerate(
																		chat.id,
																		chat.content
																	)
																}}
																className='flex items-center justify-center gap-[6px] p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer group'>
																<RefreshLineIcon
																	className={`h-[16px] w-[16px] text-custom-white ${
																		regenLoading[
																			chat
																				.id
																		] &&
																		'animate-spin'
																	}`}
																/>
																<p className='font-medium text-xs'>
																	Regenerate
																</p>
															</button>
															<button
																onClick={() => {
																	logEvent(
																		'Button Click',
																		'continue_generating_button'
																	)
																	handleContinueGenerating(
																		chat.id,
																		chat.content
																	)
																}}
																className='flex items-center justify-center gap-[6px] p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer group'>
																<SpeedMiniLineIcon
																	className={`h-[16px] w-[16px] text-custom-white ${
																		continueLoading[
																			chat
																				.id
																		] &&
																		'animate-pulse'
																	}`}
																/>
																<p className='font-medium text-xs'>
																	Continue
																	Generating
																</p>
															</button>
														</>
													)}
													{chats.length - 1 ===
														index &&
														chat.type ===
															'summary' && (
															<button
																onClick={() => {
																	logEvent(
																		'Button Click',
																		'generate_question_button'
																	)
																	generateQuestion(
																		chat.id,
																		chat.content
																	)
																}}
																className='flex items-center justify-center gap-[6px] p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer group'>
																<Image
																	src='/gen-ques.svg'
																	height={16}
																	width={16}
																	alt='Decoration icon'
																	className={`text-custom-white ${
																		generateQuestionLoading &&
																		'animate-pulse'
																	}`}
																/>
																<p className='font-medium text-xs text-custom-green'>
																	Generate
																	Questions
																</p>
															</button>
														)}
												</div>
											)}
										</div>
									</div>
								</div>
							)
						})}

						{isLoading && (
							<div className='bg-white bg-opacity-5 py-[28px]'>
								<div className='flex items-start justify-start  gap-4 text-left  max-w-[770px] mx-auto '>
									<Image
										height={32}
										width={32}
										src='/doubtss-pfp.svg'
										alt='Avatar'
										className='rounded-full overflow-clip'
									/>
									<div className='space-y-[20px]'>
										<p className=' leading-normal'>
											Researching. Please wait
											<span className='dot1'>.</span>
											<span className='dot2'>.</span>
											<span className='dot3'>.</span>
										</p>

										<button
											onClick={() => {
												stop()
												logEvent(
													'Button Click',
													'stop_generation_button'
												)
											}}
											className='flex items-center justify-center p-[8px] rounded-[9px] border border-custom-white border-opacity-20 bg-white bg-opacity-[5%] cursor-pointer gap-[6px]'>
											<StopLineIcon className='w-[18px] h-[18px]' />
											<p>Stop Generating</p>
										</button>
									</div>
								</div>
							</div>
						)}
						<div ref={chatEndRef} />
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
