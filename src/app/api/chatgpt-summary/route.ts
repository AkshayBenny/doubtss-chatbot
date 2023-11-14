import { OpenAI } from 'langchain/llms/openai'
import { LLMChain } from 'langchain/chains'
import { LangChainStream } from 'ai'
import { CallbackManager } from 'langchain/callbacks'
import { PromptTemplate } from 'langchain/prompts'
import { NextResponse } from 'next/server'
import MemoryManager from '@/app/utils/memory'
import { summary_template_prompt } from '@/app/utils/prompts'

export const runtime = 'edge'

function countTokens(text: string) {
	// Use a regular expression to match words and punctuation
	const tokens = text.match(/\b\w+\b/g)

	// If no tokens are found, return 0, otherwise return the count
	return tokens ? tokens.length : 0
}

export async function POST(req: Request) {
	const { prompt } = await req.json()
	let referredFromFileName = ''
	try {
		let data
		try {
			data = summary_template_prompt
		} catch (err) {
			console.error('Error reading companion file:', err)
			throw err
		}

		const presplit = data.split('###ENDPREAMBLE###')
		const preamble = presplit[0]
		const seedsplit = presplit[1].split('###ENDSEEDCHAT###')
		const seedchat = seedsplit[0]

		const companionKey = {
			companionName: 'name'!,
			modelName: 'chatgpt',
			userId: '',
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
			streaming: true,
			temperature: 0.7,
			modelName: 'gpt-3.5-turbo-16k',
			openAIApiKey: process.env.OPENAI_API_KEY,
			callbackManager: CallbackManager.fromHandlers(handlers),
		})
		model.verbose = true

		const replyWithTwilioLimit = 'You reply within 1000 characters.'

		const chainPrompt = PromptTemplate.fromTemplate(`
			You are Doubtss and are currently talking to a user.
			${preamble}
			You reply with answers that range from one sentence to one paragraph and with some details. ${replyWithTwilioLimit}
			Below are relevant details about Doubtss's past
			${relevantHistory}
			Below is a relevant conversation history
		    ${recentChatHistory}
			`)

		const chain = new LLMChain({
			llm: model,
			prompt: chainPrompt,
		})

		let result

		result = await chain
			.call({ relevantHistory, recentChatHistory: recentChatHistory })
			.catch((err) => {
				console.error('Error calling chain:', err)
				throw err
			})

		await memoryManager.writeToHistory(result!.text + '\n', companionKey)
		return NextResponse.json(result!.text + '$$$' + referredFromFileName)
		// return new StreamingTextResponse(stream)
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
