const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 80

app.get('/', (req, res) => {
	const url = req.query.url || 'https://jsonplaceholder.typicode.com/todos/1'
	console.log('url', url)
	console.log('params', req.query)
	fetch(url)
		.then(response => response.text())
		.then(text => res.send(`Result from API: ${text}`))
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
