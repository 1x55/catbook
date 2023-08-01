const mongoose  = require("mongoose")

const catSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    favoritFood: String,
    funFact: String,
    image: String, //storing name of image file in DB, not the image itsef.Image is stored in Public folder
})

//want other parts of our app to be able to use our schema, so need to export.
module.exports  = mongoose.model('Cat', catSchema)