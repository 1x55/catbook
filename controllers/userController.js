const passport = require('passport')
const User = require('../models/userModel')


//with 'view-engine' set to 'ejs', Express will auto look for an 'login.ejs' file in your views directory, process any EJS tags within it, and render the final HTML to send to the client.
const loginPage = (req, res) => {
    res.render('login')
}

const registerPage = (req, res) => {
    res.render('register')
}

const loginUser = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false //read into turning flash msg on
})

const registerUser = async (req, res) => {
    try{
        //destructure: 
        const {username, password} = req.body
        const user = new User({username })
        await User.register(user,password)
        passport.authenticate('local')(req,res, function() {
            res.redirect('/')
        })         

    } catch (err) {
        console.log(err)
        res.redirect('/register')
    }
}

const logoutUser = (req,res) => {
    res.logout(function(err) {
        if (err) {return next(err)}
        res.redirect('/')
    })
}

module.export = {
    loginPage,
    loginUser,
    registerPage,
    registerUser,
    logoutUser,
}