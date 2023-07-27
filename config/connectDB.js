 //set up connecting function to allow us to connect to MongoDB
 const mongoose = require('mongoose')
 
 // async allows us to send a req. to the db and wait for req. to come back
 cosnt connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch(err) {
        console.log(err)
    }
 }
