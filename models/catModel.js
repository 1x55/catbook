const mongoose  = require("mongoose")

const catShema = new mongoose.Schema({
    name: String, 
    age: Number,
    favoritFood: String,
    funFact: String,
    image: String, //storing name of image file in DB, not the image itsef.Image is stored in Public folder
})