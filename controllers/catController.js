//import our model which contains both the schema to our controller and collection name 
const Cat = require("../models/catModel")

const getAllCats = async (req,res) => {
    try {
        //talking to db, waiting for it to find all the cats
        const cats = await Cat.find()//got to Cat collection assocaited with this model and find everything
        //render the home (pass a object with all the data about the cats {cats: cats} that we got back from the database and sending it to homepage. Lets look ar home.ejs to see how it then works)
        res.render('home', {cats: cats})
    } catch(err) {
        console.log(err)
    }
}  
module.exports = {
        getAllCats
}
