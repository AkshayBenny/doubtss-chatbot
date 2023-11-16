import { Redis } from '@upstash/redis'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeClient } from '@pinecone-database/pinecone'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { VectorDBQAChain } from 'langchain/chains'
import { OpenAI } from 'langchain'

export type CompanionKey = {
	companionName: string
	modelName: string
}

class MemoryManager {
	private static instance: MemoryManager
	private history: Redis
	private vectorDBClient: PineconeClient | SupabaseClient

	public constructor() {
		this.history = Redis.fromEnv()
		if (process.env.VECTOR_DB === 'pinecone') {
			this.vectorDBClient = new PineconeClient()
		} else {
			const auth = {
				detectSessionInUrl: false,
				persistSession: false,
				autoRefreshToken: false,
			}
			const url = process.env.SUPABASE_URL!
			const privateKey = process.env.SUPABASE_PRIVATE_KEY!
			this.vectorDBClient = createClient(url, privateKey, { auth })
		}
	}

	public async init() {
		if (this.vectorDBClient instanceof PineconeClient) {
			await this.vectorDBClient.init({
				apiKey: process.env.PINECONE_API_KEY!,
				environment: process.env.PINECONE_ENVIRONMENT!,
			})
		}
	}

	public async vectorSearch(
		recentChatHistory: string,
		companionFileName: string
	) {
		if (process.env.VECTOR_DB === 'pinecone') {
			console.log('INFO: using Pinecone for vector search.')
			const pineconeClient = <PineconeClient>this.vectorDBClient

			const pineconeIndex = pineconeClient.Index(
				process.env.PINECONE_INDEX! || ''
			)

			const vectorStore = await PineconeStore.fromExistingIndex(
				new OpenAIEmbeddings({
					openAIApiKey: process.env.OPENAI_API_KEY,
				}),
				{ pineconeIndex }
			)

			const similarDocs = await vectorStore
				.similaritySearch(recentChatHistory, 3, {
					fileName: companionFileName,
				})
				.catch((err) => {
					console.log(
						'WARNING: failed to get vector search results.',
						err
					)
				})
			return similarDocs
		} else {
			console.log('INFO: using Supabase for vector search.')
			const supabaseClient = <SupabaseClient>this.vectorDBClient
			const vectorStore = await SupabaseVectorStore.fromExistingIndex(
				new OpenAIEmbeddings({
					openAIApiKey: process.env.OPENAI_API_KEY,
				}),
				{
					client: supabaseClient,
					tableName: 'documents',
					queryName: 'match_documents',
				}
			)
			const similarDocs = await vectorStore
				.similaritySearch(recentChatHistory, 3)
				.catch((err) => {
					console.log(
						'WARNING: failed to get vector search results.',
						err
					)
				})
			return similarDocs
		}
	}

	public async pineconeVectorSearch(
		query: string,
		numberOfResults: number = 1,
		metadataFilter?: any
	) {
		const client = new PineconeClient()
		await client.init({
			apiKey: process.env.PINECONE_API_KEY!,
			environment: process.env.PINECONE_ENVIRONMENT!,
		})
		const pineconeIndex = client.Index(process.env.PINECONE_INDEX!)

		const vectorStore = await PineconeStore.fromExistingIndex(
			new OpenAIEmbeddings(),
			{ pineconeIndex }
		)

		// Search the vector DB independently with meta filters
		const results = await vectorStore.similaritySearch(
			query,
			numberOfResults,
			metadataFilter
		)
		console.log(results)

		// Optionally use as part of a chain (currently no metadata filters)
		const model = new OpenAI()
		const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
			k: numberOfResults,
			returnSourceDocuments: true,
		})
		const response = await chain.call({ query: query })
		console.log(response)

		// Return the desired results, either `results` or `response`
		return results // or return response;
	}

	public static async getInstance(): Promise<MemoryManager> {
		if (!MemoryManager.instance) {
			MemoryManager.instance = new MemoryManager()
			await MemoryManager.instance.init()
		}
		return MemoryManager.instance
	}

	private generateRedisCompanionKey(companionKey: CompanionKey): string {
		return `${companionKey.companionName}-${companionKey.modelName}`
	}

	public async writeToHistory(text: string, companionKey: CompanionKey) {
		if (!companionKey) {
			console.log('Companion key set incorrectly')
			return ''
		}

		const key = this.generateRedisCompanionKey(companionKey)
		const result = await this.history.zadd(key, {
			score: Date.now(),
			member: text,
		})

		return result
	}

	public async readLatestHistory(
		companionKey: CompanionKey
	): Promise<string> {
		if (!companionKey) {
			console.log('Companion key set incorrectly')
			return ''
		}

		const key = this.generateRedisCompanionKey(companionKey)
		let result = await this.history.zrange(key, 0, Date.now(), {
			byScore: true,
		})

		result = result.slice(-10).reverse()
		const recentChats = result.reverse().join('\n')
		return recentChats
	}

	public async seedChatHistory(
		seedContent: String,
		delimiter: string = '\n',
		companionKey: CompanionKey
	) {
		const key = this.generateRedisCompanionKey(companionKey)
		if (await this.history.exists(key)) {
			console.log('User already has chat history')
			return
		}

		const content = seedContent.split(delimiter)
		let counter = 0
		for (const line of content) {
			await this.history.zadd(key, { score: counter, member: line })
			counter += 1
		}
	}
}

export default MemoryManager
