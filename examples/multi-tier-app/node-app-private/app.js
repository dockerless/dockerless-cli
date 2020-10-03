const express = require('express')
const Redis = require('ioredis')

const redis = new Redis(6379, 'hello-redis-dev.hello-namespace-dev')
const app = express()
const port = 81

app.get('/', async (req, res) => {
	await redis.set('greeting', 'Hello')
	const result = await redis.get('greeting')
	res.send(result)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
