import {
	generate_question_template,
	question_template_prompt,
	summary_template_prompt,
} from '@/app/utils/prompts'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	console.log(`Start seeding ...`)

	await prisma.technialPrompt.create({
		generateQuestionForContentPrompt: generate_question_template,
		generateQuestionPrompt: question_template_prompt,
		regeneratePrompt: '',
		summaryPrompt: summary_template_prompt,
	})

	console.log(`Seeding finished.`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
