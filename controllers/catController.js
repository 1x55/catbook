//import our model which contains both the schema to our controller and collection name 
const Cat = require("../models/catModel")
//multer: used to process image uploads
const multer = require('multer');

//multer config for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
//take image out of form and placing it into public/images file
const upload = multer({ storage: storage });

const getAllCats = async (req,res) => {
    try {
        //talking to db, waiting for it to find all the cats
        //got to Cat collection assocaited with this model and find everything
        const cats = await Cat.find()
        //render the home (pass a object with all the data about the cats {cats: cats} that we got back from the database and sending it to homepage. Lets look ar home.ejs to see how it then works)
        res.render('home', {cats: cats})
    } catch(err) {
        console.log(err)
    }
}  

//display upload page form
const uploadPage = (req,res) => {
res.render('upload')
}

const createCat = async (req, res) => {
    try {
      const cat = new Cat({
        name: req.body.name,
        age: req.body.age,
        favoriteFood: req.body.favoriteFood,
        funFact: req.body.funFact,
        image: req.file.filename // multer places the file info in req.file
      });
    
    //mongoose method: save
    await cat.save();
    res.redirect('/');
  } catch(err) {
    console.log(err);
  }
};

const editPage = async (req, res) => {
    try{
        const cat = await Cat.findById(req.params.id)
        res.render('edit', {cat:cat})
    }catch(err) {
        console.log(err)
    } 
}

const updateCat = async (req, res) => {
    try{
        //req.params is what we are looking for, req.body is the stuff we will replace
        await Cat.findByIdAndUpdate(req.params.id,req.body)
        res.redirect('/') //instead of rendering (editPage) we want a redirect
    }catch(err) {
        console.log(err)
    }
}

const deleteCat = async (req, res) => {
    try{
        await Cat.findByIdAndRemove(req.params.id)
        res.redirect('/')
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
        getAllCats,
        upload,
        uploadPage,
        createCat,
        editPage,
        updateCat,
        deleteCat,
}
