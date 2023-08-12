// Major ref: https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/pinecone
import { PineconeClient } from '@pinecone-database/pinecone'
import dotenv from 'dotenv'
import { Document } from 'langchain/document'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import fs from 'fs'
import path from 'path'
import pdfParse from 'pdf-parse'

dotenv.config({ path: `.env.local` })

const fileNames = fs.readdirSync('documents')
const splitter = new CharacterTextSplitter({
	separator: ' ',
	chunkSize: 1000,
	chunkOverlap: 100,
})

const langchainDocs = await Promise.all(
	fileNames.map(async (fileName) => {
		const filePath = path.join('documents', fileName)
		console.log('Processing file:', filePath)

		let fileContent = ''

		if (fileName.endsWith('.txt')) {
			fileContent = fs.readFileSync(filePath, 'utf8')
		} else if (fileName.endsWith('.pdf')) {
			const fileBuffer = fs.readFileSync(filePath)
			const pdfData = await pdfParse(fileBuffer)
			fileContent = pdfData.text // Reading the entire content of the PDF
		} else {
			// Ignore other file types
			return
		}

		const splitDocs = await splitter.createDocuments([fileContent])

		const splitData = splitDocs.map((doc) => {
			return new Document({
				metadata: { fileName },
				pageContent: doc.pageContent,
			})
		})
		console.log(splitData)
		console.log(splitData.flat().filter((doc) => doc !== undefined))

		// Define the path where you want to save the JSON file
		const outputPath = path.join('fileNames.json')

		// Convert the fileNames array to a JSON string
		const fileNamesJson = JSON.stringify(fileNames, null, 2) // 2 spaces indentation

		// Write the JSON string to the file
		fs.writeFileSync(outputPath, fileNamesJson)

		console.log(`File names have been saved to ${outputPath}`)

		return splitData
	})
)

const client = new PineconeClient()
await client.init({
	apiKey: process.env.PINECONE_API_KEY,
	environment: process.env.PINECONE_ENVIRONMENT,
})
const pineconeIndex = client.Index(process.env.PINECONE_INDEX)

await PineconeStore.fromDocuments(
	langchainDocs.flat().filter((doc) => doc !== undefined),
	new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
	{
		pineconeIndex,
	}
)
