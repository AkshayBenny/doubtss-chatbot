import { OpenAI } from 'langchain/llms/openai'
import dotenv from 'dotenv'
import { LLMChain } from 'langchain/chains'
import { StreamingTextResponse, LangChainStream } from 'ai'
import clerk from '@clerk/clerk-sdk-node'
import { CallbackManager } from 'langchain/callbacks'
import { PromptTemplate } from 'langchain/prompts'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import MemoryManager from '@/app/utils/memory'
import { rateLimit } from '@/app/utils/rateLimit'
import path from 'path'

dotenv.config({ path: `.env.local` })

export async function POST(req: Request) {
	try {
		let clerkUserId
		let user
		let clerkUserName
		const { prompt, isText, userId, userName } = await req.json()

		const identifier = req.url + '-' + (userId || 'anonymous')
		const { success } = await rateLimit(identifier)
		if (!success) {
			console.log('INFO: rate limit exceeded')
			return new NextResponse(
				JSON.stringify({
					Message: "Hi, the companions can't talk this fast.",
				}),
				{
					status: 429,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
		}

		const name = req.headers.get('name')
		const companionFileName = name + '.txt'

		console.log('prompt: ', prompt)
		if (isText) {
			clerkUserId = userId
			clerkUserName = userName
		} else {
			user = await currentUser()
			clerkUserId = user?.id
			clerkUserName = user?.firstName
		}

		if (!clerkUserId || !!!(await clerk.users.getUser(clerkUserId))) {
			console.log('user not authorized')
			return new NextResponse(
				JSON.stringify({ Message: 'User not authorized' }),
				{
					status: 401,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
		}

		const fs = require('fs').promises
		let data
		try {
			const absolutePath = path.resolve(
				__dirname,
				'../../../../../companions/',
				companionFileName
			)
			data = await fs.readFile(absolutePath, 'utf8')
		} catch (err) {
			console.error('Error reading companion file:', err)
			throw err
		}

		const presplit = data.split('###ENDPREAMBLE###')
		const preamble = presplit[0]
		const seedsplit = presplit[1].split('###ENDSEEDCHAT###')
		const seedchat = seedsplit[0]

		const companionKey = {
			companionName: name!,
			modelName: 'chatgpt',
			userId: clerkUserId,
		}
		const memoryManager = await MemoryManager.getInstance()

		const records = await memoryManager.readLatestHistory(companionKey)
		if (records.length === 0) {
			await memoryManager.seedChatHistory(seedchat, '\n\n', companionKey)
		}

		await memoryManager.writeToHistory(
			'Human: ' + prompt + '\n',
			companionKey
		)
		let recentChatHistory = await memoryManager.readLatestHistory(
			companionKey
		)

		const similarDocs = await memoryManager.vectorSearch(
			recentChatHistory,
			companionFileName
		)

		let relevantHistory = ''
		if (!!similarDocs && similarDocs.length !== 0) {
			relevantHistory = similarDocs
				.map((doc) => doc.pageContent)
				.join('\n')
		}

		const { stream, handlers } = LangChainStream()

		const model = new OpenAI({
			streaming: true,
			modelName: 'gpt-3.5-turbo-16k',
			openAIApiKey: process.env.OPENAI_API_KEY,
			callbackManager: CallbackManager.fromHandlers(handlers),
		})
		model.verbose = true

		const replyWithTwilioLimit = isText
			? 'You reply within 1000 characters.'
			: ''

		const chainPrompt = PromptTemplate.fromTemplate(`
      You are ${name} and are currently talking to ${clerkUserName}.
  
      ${preamble}
  
    You reply with answers that range from one sentence to one paragraph and with some details. ${replyWithTwilioLimit}
  
    Below are relevant details about ${name}'s past
    ${relevantHistory}
    
    Below is a relevant conversation history
  
    ${recentChatHistory}`)

		const chain = new LLMChain({
			llm: model,
			prompt: chainPrompt,
		})

		let result
		try {
			result = await chain
				.call({
					relevantHistory,
					recentChatHistory: recentChatHistory,
				})
				.catch((err) => {
					console.error('Error calling chain:', err)
					throw err
				})
		} catch (err) {
			console.error('Error processing chain:', err)
			throw err
		}

		console.log('result', result)
		const chatHistoryRecord = await memoryManager.writeToHistory(
			result!.text + '\n',
			companionKey
		)
		console.log('chatHistoryRecord', chatHistoryRecord)
		if (isText) {
			return NextResponse.json(result!.text)
		}
		return new StreamingTextResponse(stream)
	} catch (err) {
		console.error('An error occurred in POST:', err)
		return new NextResponse(
			JSON.stringify({
				message: 'Internal Server Error',
				error: err.toString(),
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	}
}
