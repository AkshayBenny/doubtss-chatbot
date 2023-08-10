import { OpenAI } from 'langchain/llms/openai'
import { LLMChain } from 'langchain/chains'
import { StreamingTextResponse, LangChainStream } from 'ai'
import clerk from '@clerk/clerk-sdk-node'
import { CallbackManager } from 'langchain/callbacks'
import { PromptTemplate } from 'langchain/prompts'
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs'
import MemoryManager from '@/app/utils/memory'
import { rateLimit } from '@/app/utils/rateLimit'

export const runtime = 'edge'

export async function POST(req: Request) {
	const txt_alex_data = `You are Doubtss.com, aiding UPSC CSE Aspirants with clear answers and practice prelims and mains questions.
    ###ENDPREAMBLE###
    Question: What is the impeachment process of the President of India?
    Doubtss.com: Impeachment requires:
    1. **Initiation:** Either House.
    2. **Investigation, Approval, Resolution:** Two-thirds majority in initiating House.
    3. **Second House Approval:** Two-thirds majority.
    4. **Removal:** If passed by both Houses.
    **Prelims Questions:**
    - Which House can initiate impeachment? 
    (a) Lok Sabha 
    (b) Rajya Sabha 
    (c) Either 
    (d) Neither
    - What majority is needed to impeach the President? 
    (a) Simple 
    (b) Absolute 
    (c) Three-fourths 
    (d) Two-thirds
    **Mains Questions:**
    - Discuss the impeachment process of the President of India.
    - Evaluate the checks and balances in the Indian Constitution, focusing on impeachment.
    ###ENDSEEDCHAT###`

	try {
		let clerkUserId
		let user
		let clerkUserName
		const { prompt, isText, userId, userName } = await req.json()

		const identifier = req.url + '-' + (userId || 'anonymous')
		const { success } = await rateLimit(identifier)

		if (!success) {
			// console.log('INFO: rate limit exceeded')
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

		// console.log('prompt: ', prompt)
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

		let data
		try {
			data = txt_alex_data
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

		// start = Date.now()
		// const similarDocs = await memoryManager.vectorSearch(
		// 	recentChatHistory,
		// 	companionFileName
		// )
		// execTimes['vectorSearch'] = Date.now() - start

		// let relevantHistory = ''
		// if (!!similarDocs && similarDocs.length !== 0) {
		// 	relevantHistory = similarDocs
		// 		.map((doc) => doc.pageContent)
		// 		.join('\n')
		// }

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
        ${replyWithTwilioLimit}
        `)

		// Below are relevant details about ${name}'s past
		// ${relevantHistory}

		const chain = new LLMChain({
			llm: model,
			prompt: chainPrompt,
		})

		let result
		try {
			result = await chain
				.call({
					recentChatHistory: recentChatHistory,
				})
				// >>>>>>>>> add relevantHistory to this object <<<<<<<<<<
				.catch((err) => {
					console.error('Error calling chain:', err)
					throw err
				})
		} catch (err) {
			console.error('Error processing chain:', err)
			throw err
		}

		// console.log('result', result)
		const chatHistoryRecord = await memoryManager.writeToHistory(
			result!.text + '\n',
			companionKey
		)
		// console.log('chatHistoryRecord', chatHistoryRecord)
		if (isText) {
			return NextResponse.json(result!.text)
		}

		return new StreamingTextResponse(stream)
	} catch (err: any) {
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
