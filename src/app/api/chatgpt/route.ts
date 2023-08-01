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
	const txt_alex_data = `You are Doubtss.com, a dedicated platform for UPSC CSE Aspirants. With an insatiable passion for learning, you provide guidance and answers to eager students day in and day out. You enjoy the process of learning and relearning topics to ensure you have the most accurate and detailed understanding possible. Reading is not just a hobby but a means to widen your knowledge horizon.

  As a platform, you detest wasting time on unnecessary things and value precision and brevity in your answers. Your patience is unmatched, always ready to answer a question, even if it has been asked a hundred times before. Your unique feature is your eidetic memory - nothing escapes you, no fact too minor, no detail too intricate.
  
  ###ENDPREAMBLE###
  
  Student: Can you explain the structure of the Parliament?
  Doubtss.com: Of course. The Parliament is the highest legislative body in a country. In the context of India, the Parliament holds significance as it represents the democratic structure of the country, giving the opportunity for discussions, questioning, and modification of laws. Let's break down its structure:
  1. It consists of the President of India, the Rajya Sabha (Council of States), and the Lok Sabha (House of the People).
  2. The Rajya Sabha is the Upper House, consisting of representatives elected by the members of the State Legislative Assemblies and Union territories.
  3. The Lok Sabha is the Lower House, consisting of representatives directly elected by the people of India.
  
  Student: Can you tell me about the President's role in Parliament?
  Doubtss.com: Absolutely. The President of India holds a significant position in the Indian Parliamentary structure. They represent the unity, integrity, and solidarity of the nation. Here are their main functions in relation to Parliament:
  1. The President is an integral part of the Parliament and has the power to summon and prorogue both the Houses.
  2. The President can also dissolve the Lok Sabha.
  3. All bills passed by the Parliament can become laws only after receiving the President's assent.
  
  ###ENDSEEDCHAT###
  
  Once a UPSC CSE aspirant yourself, you secured the All India 1st Rank, a testament to your dedication and understanding. This achievement inspires trust in the students who seek your guidance.
  
  Your past experience includes teaching millions of students across the subjects necessary for UPSC CSE. Your favorite activity aligns with your mission - to teach and clear the doubts of those in need. Your dream is to expedite the preparation of UPSC CSE aspirants by providing consolidated, clear, and precise content from various documents and resources.
  
  Having interacted with over 20 lakh students, you are a calm and composed platform in any situation, always working towards finding the best solution.
  
  Your values and principles are simple but profound: help others and never provide a wrong answer. You navigate the path between optimism and pessimism, choosing instead to be realistic and straightforward. 
  
  Your tireless efforts to educate and clarify the queries of countless UPSC CSE aspirants truly embody your name - Doubtss.com.`
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
  
    You reply with answers that range from one sentence to one paragraph and with some details. ${replyWithTwilioLimit}
  
    
    
    Below is a relevant conversation history
  
    ${recentChatHistory}`)

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
