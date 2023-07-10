const passport = require("passport")
const validator = require("validator")
const User = require('../models/User')

module.exports = {
  newUser: async (req, res, next) => {
    try {
      console.log(req.body)
      if (!validator.isEmail(req.body.email))
        return res.status(400).json({ msg:"Please enter a valid email address" })
      if (!validator.isLength(req.body.password, { min: 8 }))
        return res.status(400).json({ msg:"Password must be at least 8 characters long" })
      if (req.body.password !== req.body.confirmPassword)
        return res.status(400).json({ msg:"Passwords do not match" })
    
      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

      const existingUser = await User.findOne({ email: req.body.email }).exec()
      
      if(existingUser){
        return res.status(400).json({ msg:"Account associated with that email already exists" })
      }
        
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

      req.logIn(user, (error) => {
        if(error){
          return next(error)
        }
        res.status(200).json({ id: user._id, name: user.name, email: user.email, msg:"User logged in successfully" })
      })
    } 
    catch (error) {
      return next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      if (!validator.isEmail(req.body.email))
        return res.status(400).json({ msg: "Please enter a valid email address" })
      if (validator.isEmpty(req.body.password))
        return res.status(400).json({ msg: "Password cannot be blank" })

      req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(400).json(info)
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.status(200).json({id: req.user.id, name: req.user.name})
        })
      })
      (req, res, next)
    } 
    catch (error) {
      return next(error)
    }
  },
  logout: async (req,res,next) => {
    try {
      req.logout(() => {
          console.log('User has logged out')
      })
      // res.cookie("connect.sid","", {
      //   httpOnly: true,
      //   expires: new Date(0)
      // })
      req.session.destroy((err) => {
        if (err)
          console.log("Error : Failed to destroy the session during logout", err);
        req.user = null;
        return res.status(200).json('Logged out')
      })
    } 
    catch (error) {
      console.log(error)
    }
  }
}