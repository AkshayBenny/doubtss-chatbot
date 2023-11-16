import { OpenAI } from 'langchain/llms/openai'
import { LLMChain } from 'langchain/chains'
import { LangChainStream } from 'ai'
import { CallbackManager } from 'langchain/callbacks'
import { PromptTemplate } from 'langchain/prompts'
import { NextResponse } from 'next/server'
import MemoryManager from '@/app/utils/memory'
import { rateLimit } from '@/app/utils/rateLimit'
import { question_template_prompt } from '@/app/utils/prompts'

export const runtime = 'edge'

export async function POST(req: Request) {
	let referredFromFileName = ''
	try {
		const { prompt } = await req.json()

		let data
		try {
			data = question_template_prompt
		} catch (err) {
			console.error('Error reading companion file:', err)
			throw err
		}

		const presplit = data.split('###ENDPREAMBLE###')
		const preamble = presplit[0]
		const seedsplit = presplit[1].split('###ENDSEEDCHAT###')
		const seedchat = seedsplit[0]

		const companionKey = {
			companionName: 'Doubtss.com',
			modelName: 'chatgpt',
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
		let relevantHistory = ''
		let pineconeSimilarDocs: any = []
		// query Pinecone
		try {
			pineconeSimilarDocs = await memoryManager.pineconeVectorSearch(
				recentChatHistory
			)

			if (pineconeSimilarDocs[0].metadata.fileName) {
				referredFromFileName = pineconeSimilarDocs[0].metadata.fileName
			}

			if (!!pineconeSimilarDocs && pineconeSimilarDocs.length !== 0) {
				relevantHistory = pineconeSimilarDocs
					.map((doc: any) => doc.pageContent)
					.join('\n')
			}
		} catch (err: any) {
			console.log('Quering pinecone went wrong!!', err.message)
		}
		const { stream, handlers } = LangChainStream()

		const model = new OpenAI({
			temperature: 0.5,
			streaming: true,
			modelName: 'gpt-3.5-turbo-16k',
			openAIApiKey: process.env.OPENAI_API_KEY,
			callbackManager: CallbackManager.fromHandlers(handlers),
		})
		model.verbose = true

		const replyWithTwilioLimit = 'You reply within 1000 characters.'

		const chainPrompt = PromptTemplate.fromTemplate(`
		You are Doubtss.com and are currently talking to a person.
		You reply with sample UPSC prelims and mains questions that includes 3 prelims and 3 mains questions for every topic asked. ${replyWithTwilioLimit}
		Below are relevant details about your past
		${relevantHistory}
		Below is a relevant conversation history
		${recentChatHistory}
        `)

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
				.catch((err) => {
					console.error('Error calling chain:', err)
					throw err
				})
		} catch (err) {
			console.error('Error processing chain:', err)
			throw err
		}

		const chatHistoryRecord = await memoryManager.writeToHistory(
			result!.text + '\n',
			companionKey
		)

		return NextResponse.json(result!.text + '$$$' + referredFromFileName)
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
