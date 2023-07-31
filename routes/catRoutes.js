const express = require('express')
const catController = require('../controllers/catController')
const router = express.Router()

//if someone visits the homepage then, get controller that displays all cats
router
  .route("/")
  .get(catController.getAllCats)

 //route for upload
router
 .route("upload") 
 .get(catController.uploadPage)
        
 //route for edit 
 router
  .route('/edit/:id')
  .get(catContoller.updateCat)

//delete route
router
 .route('delete/:id')
 .post(catController.deleteCat)

 module.exports = router