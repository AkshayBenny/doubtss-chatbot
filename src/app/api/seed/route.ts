import prisma from '@/app/db/prisma'
import {
	generate_question_template,
	question_template_prompt,
	question_template_prompt_with_vector_data,
	summary_template_prompt,
	summary_template_prompt_with_vector_data,
} from '@/app/utils/prompts'
import { NextResponse } from 'next/server'

async function main() {
	console.log(`Start seeding ...`)

	await prisma.technialPrompt.create({
		data: {
			generateQuestionForContentPrompt: generate_question_template,
			generateQuestionPromptWithVectorData:
				question_template_prompt_with_vector_data,
			generateQuestionPrompt: question_template_prompt,
			regeneratePrompt: '',
			summaryPrompt: summary_template_prompt,
			summaryPromptWithVectorData:
				summary_template_prompt_with_vector_data,
		},
	})

	console.log(`Seeding finished.`)
}

export async function GET(req: Request) {
	try {
		main()
			.then(async () => {
				await prisma.$disconnect()
			})
			.catch(async (e) => {
				console.error(e)
				await prisma.$disconnect()
				process.exit(1)
			})
		return NextResponse.json({ succes: true })
	} catch (error: any) {
		console.log(error.message || error)
	}
}
