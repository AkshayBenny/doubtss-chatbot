'use client'

import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useCompletion } from 'ai/react'

var last_name = ''

export default function TestQAModal({
	open,
	setOpen,
	example,
}: {
	open: boolean
	setOpen: any
	example: any
}) {
	if (!example) {
		// create a dummy so the completion doesn't croak during init.
		example = new Object()
		example.llm = ''
		example.name = ''
	}

	let {
		completion,
		input,
		isLoading,
		handleInputChange,
		handleSubmit,
		stop,
		setInput,
		setCompletion,
	} = useCompletion({
		api: '/api/' + 'chatgpt',
		headers: { name: 'Alex' },
	})

	if (!example) {
		console.log('ERROR: no companion selected')
		return null
	}
	console.log({
		completion,
		input,
		isLoading,
		handleInputChange,
		handleSubmit,
		stop,
		setInput,
		setCompletion,
	})

	return (
		<div className='fixed inset-0 z-10 overflow-y-auto'>
			<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
				<div>
					<form onSubmit={handleSubmit}>
						<input
							placeholder="How's your day?"
							className={
								'w-full flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm focus:outline-none sm:text-sm sm:leading-6 ' +
								(isLoading && !completion
									? 'text-gray-600 cursor-not-allowed'
									: 'text-white')
							}
							value={input}
							onChange={handleInputChange}
							disabled={isLoading && !completion}
						/>
					</form>
					<div className='mt-3 sm:mt-5'>
						<div className='mt-2'>
							<p className='text-sm text-gray-500'>
								Chat with {example.name}
							</p>
						</div>
						{completion && (
							<div className='mt-2'>
								<p className='text-sm text-gray-200'>
									{completion}
								</p>
							</div>
						)}

						{isLoading && !completion && (
							<p className='flex items-center justify-center mt-4'>
								<svg
									className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'>
									<circle
										className=''
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										stroke-width='4'></circle>
									<path
										className=''
										fill='currentColor'
										d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
								</svg>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
