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

function moveToErrorDir(filePath) {
	const errorDirPath = path.join('.', 'error_files')
	if (!fs.existsSync(errorDirPath)) {
		fs.mkdirSync(errorDirPath)
	}
	const destinationPath = path.join(errorDirPath, path.basename(filePath))
	fs.renameSync(filePath, destinationPath)
}

function appendFileNameToJson(fileName) {
	const outputPath = path.join('fileNames.json')
	let processedFiles = []

	if (fs.existsSync(outputPath)) {
		const existingData = fs.readFileSync(outputPath, 'utf8')
		processedFiles = JSON.parse(existingData)
	}

	processedFiles.push(fileName)
	fs.writeFileSync(outputPath, JSON.stringify(processedFiles, null, 2))
}

const client = new PineconeClient()
await client.init({
	apiKey: process.env.PINECONE_API_KEY,
	environment: process.env.PINECONE_ENVIRONMENT,
})
const pineconeIndex = client.Index(process.env.PINECONE_INDEX)

for (const fileName of fileNames) {
	const filePath = path.join('documents', fileName)
	console.log('Processing file:', filePath)

	let fileContent = ''

	if (fileName.endsWith('.txt')) {
		fileContent = fs.readFileSync(filePath, 'utf8')
	} else if (fileName.endsWith('.pdf')) {
		const fileBuffer = fs.readFileSync(filePath)
		const pdfData = await pdfParse(fileBuffer)
		fileContent = pdfData.text
	} else {
		continue
	}

	const splitDocs = await splitter.createDocuments([fileContent])
	const splitData = splitDocs.map((doc) => {
		return new Document({
			metadata: { fileName },
			pageContent: doc.pageContent,
		})
	})

	try {
		await PineconeStore.fromDocuments(
			splitData.flat().filter((doc) => doc !== undefined),
			new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
			{
				pineconeIndex,
			}
		)

		fs.unlinkSync(filePath)
		console.log(`Processed, uploaded, and deleted ${fileName}`)
		appendFileNameToJson(fileName)
	} catch (error) {
		console.error(`Error uploading ${fileName}:`, error)
		moveToErrorDir(filePath)
	}
}
