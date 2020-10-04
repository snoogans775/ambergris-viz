const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')
const fs = require('fs')

const app = express()
const port = 3001
const filepath = __dirname + '/public'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(filepath))
app.use(cors())

app.get('/', (request, response) => {
	response.json({ info:'Node.js, Express, and PostgreSQL API' })
})

app.get('/books', db.getBooks)
app.get('/books/:id', db.getBookById)
app.post('/books', db.addBook)
app.put('/books/:id', db.updateBook)
app.delete('books/:id', db.deleteBook)

//Temporary non-psql routes
app.get('/us-states-shapefile', (request, response) => {
	//get json in /data
})

const jsonDbInsert(json) {
	const query =`'INSERT INTO us_states_features
		SELECT * FROM json_populate_recordset(NULL::us_states_features,
		${json}
	)`
}

// Run server
app.listen(process.env.PORT || port, () => console.log("listening @ 3001 or server-defined port "))

