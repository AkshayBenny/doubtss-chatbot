import http from 'http'
import https from 'https'

function logRequest(url, options, data, callback) {
	const start = Date.now()

	console.log(`Request to ${url} started at ${new Date().toISOString()}`)

	const protocol = url.startsWith('https://') ? https : http
	const req = protocol.request(url, options, (res) => {
		let body = ''
		res.on('data', (chunk) => {
			body += chunk
		})
		res.on('end', () => {
			const end = Date.now()
			console.log(
				`Request to ${url} ended at ${new Date().toISOString()}, took ${
					end - start
				} ms`
			)
			callback(null, body)
		})
	})

	req.on('error', (error) => {
		console.error(`Error in request to ${url}: ${error.message}`)
		callback(error)
	})

	if (data) {
		req.write(data)
	}

	req.end()
}
