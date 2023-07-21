// 1. Initialize a new project with: npm init -y, and create an 4 js files .env file
// 2. npm i "@pinecone-database/pinecone@^0.0.10" dotenv@^16.0.3 langchain@^0.0.73
// 3. Obtain API key from OpenAI (https://platform.openai.com/account/api-keys)
// 4. Obtain API key from Pinecone (https://app.pinecone.io/)
// 5. Enter API keys in .env file
// Optional: if you want to use other file loaders (https://js.langchain.com/docs/modules/indexes/document_loaders/examples/file_loaders/)
import express from 'express'
import { PineconeClient } from '@pinecone-database/pinecone'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import * as dotenv from 'dotenv'

import { createPineconeIndex } from './utils/createPineconeIndex.js'
import { updatePinecone } from './utils/updatePinecone.js'
import { queryPineconeVectorStoreAndQueryLLM } from './utils/queryPineconeVectorStoreAndQueryLLM.js'

// 6. Load environment variables
dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4000

// 7. Set up DirectoryLoader to load documents from the ./documents directory
const loader = new DirectoryLoader('./documents', {
	'.txt': (path) => new TextLoader(path),
	'.pdf': (path) => new PDFLoader(path),
})
const docs = await loader.load()

// 8. Set up variables for the filename, question, and index settings
// =====================QUESTION========================
const question = 'Tell me about Batman.'
// =====================================================

const indexName = 'your-pinecone-index-name'
const vectorDimension = 1536

// 9. Initialize Pinecone client with API key and environment
const client = new PineconeClient()
await client.init({
	apiKey: process.env.PINECONE_API_KEY,
	environment: process.env.PINECONE_ENVIRONMENT,
})

app.get('/create-pinecone-index', async (req, res) => {
	try {
		await createPineconeIndex(client, indexName, vectorDimension)
		res.json({
			message: 'Success',
		})
	} catch (error) {
		res.json({ message: 'Failure', error })
	}
})

app.get('/update-pinecone', async (req, res) => {
	try {
		await updatePinecone(client, indexName, docs)
		res.json({ message: 'Success' })
	} catch (error) {
		res.json({ message: 'Failure', error })
	}
})

app.post('/chat', async (req, res) => {
	const { query } = req.body
	console.log(query)

	try {
		const response = await queryPineconeVectorStoreAndQueryLLM(
			client,
			indexName,
			query
		)
		res.json({ message: 'Success', bot: response })
	} catch (error) {
		res.json({ message: 'Failure', error })
	}
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
