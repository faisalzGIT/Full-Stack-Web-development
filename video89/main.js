const exp = require('constants')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

app.get('/', (req, res) => {
  	res.send('Hello World!')
  	console.log('Hey its a GET request');
})

app.post('/', (req, res) => {
	res.send('Hello World!')
	console.log('Hey its a POST request');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});