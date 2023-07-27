equire('dotenv').config().const express = require('express')
const app = express()
const PORT = process.env.PORT ||  3500
//Add middleware: (help process requests that go in and out of our server)
const mongoose = require('mongoose') 

app.use(express.json())
app.use(express.urlencoded ({extended: true})
app.use(express.static('public')) // middleware configuration in a express.js app that serves static files from the ‘public’ directory and serve it back to client if found

// Set up view engine (EJS: embedded JavaScript), simplifies the process of generating dynamic HTML content in web applications. By embedding JavaScript code directly into templates, developers can create data-driven and interactive web pages efficiently.

app.set('view engine', 'ejs')

app.listen(PORT, () => console.log(`server running on port ${PORT`))