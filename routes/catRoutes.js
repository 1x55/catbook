const express = require('express');
const catController = require('../controllers/catController');
const router = express.Router();

//if someone visits the homepage then, get controller that displays all cats
router
.route('/')
.get(catController.getAllCats)

 //route for upload
router
.route('/upload')
.get(catController.uploadPage)
//places image in public/images folder
.post(catController.upload.single('image'), catController.createCat);  
        
 //route for edit 
 router
 .route('/edit/:id')
 .get(catController.editPage)
 .post(catController.updateCat);


// delete route
router
  .route('/delete/:id')
  .post(catController.deleteCat);

module.exports = router;