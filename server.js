require('dotenv').config();
const express = require('express');
//const path = require('path');
const app = express();
const connectDB = require('./config/connectDB')
const catRoutes = require('./routes/catRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/userModel'); // use the path to your User model

const PORT = process.env.PORT ||  3500

//call connecDB function created in connectDB.js. When bellow is typed, line 7 is auto imported by vscode. since we exported it, it was automatically imported here by vsCode. Establish connection with DB
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// middleware configuration in a express.js app that serves static files from the ‘public’ directory and serve it back to client if found
app.use(express.static('public'));

// Set up view engine (EJS: embedded JavaScript), simplifies the process of generating dynamic HTML content in web applications. By embedding JavaScript code directly into templates, developers can create data-driven and interactive web pages efficiently.
app.set('view engine', 'ejs');

//Applications must initialize session support in order to make use of login sessions. In an Express app, session support is added by using express-session middleware.

app.use(session({
    secret: 'cats are awesome', 
    resave: false,
    saveUninitialized: false
  }));

//add the Passport initialization middleware to your express.js app
app.use(passport.initialize());
//this middleware will handle user session management. allowing Passport to serilaze and deserialize user instances into and from the session
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
//scramble p/w
passport.serializeUser(User.serializeUser());
//descrable p/w
passport.deserializeUser(User.deserializeUser());

//passing current user info to all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
    });

//middleware our server is setup to listen to someone visiting the home page. indicates that the middleware function(s) specified in the 'catRoutes' will be executed for any request made to the root path of the app
app.use('/', userRoutes);
app.use('/', catRoutes);

//Listen for the 'open' event on the database connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
