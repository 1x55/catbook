require('dotenv').config() //global
const express = require('express')
const app = express()
//Add middleware: (help process requests that go in and out of our server)
const mongoose = require('mongoose') 
const connectDB = require('./config/connectDB')
const catRoutes = require('.routes/catRoutes')
const PORT = process.env.PORT ||  3500

//call connecDB function created in connectDB.js. When bellow is typed, line 7 is auto imported by vscode. since we exported it, it was automatically imported here by vsCode. Establish connection with DB
connectDB()

app.use(express.json())
app.use(express.urlencoded ({extended: true}))
app.use(express.static('public')) // middleware configuration in a express.js app that serves static files from the ‘public’ directory and serve it back to client if found

// Set up view engine (EJS: embedded JavaScript), simplifies the process of generating dynamic HTML content in web applications. By embedding JavaScript code directly into templates, developers can create data-driven and interactive web pages efficiently.

app.set('view engine', 'ejs')

//middleware our server is setup to listen to someone visiting the home page. indicates that the middleware function(s) specified in the 'catRoutes' will be executed for any request made to the root path of the app
app.use('/', catRoutes)

//Listen for the 'open' event on the database connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) 
})
