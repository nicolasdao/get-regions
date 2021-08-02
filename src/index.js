const https = require('https')

const GIST = 'https://gist.githubusercontent.com/nicolasdao/b751bebefb03c7dd759b1c0ad3e74e51/raw'

const httpGet = url => new Promise((next, fail) => https.get(url, res => {
	let data = []
	
	res.on('data', chunk => {
		data.push(chunk)
	})

	res.on('end', () => {
		next(JSON.parse(Buffer.concat(data).toString()))
	})
}).on('error', err => {
	fail(err)
}))

const awsRegions = httpGet(`${GIST}/aws_regions.json`)
const gcpRegions = httpGet(`${GIST}/gcp_regions.json`)

module.exports = {
	awsRegions,
	gcpRegions
}