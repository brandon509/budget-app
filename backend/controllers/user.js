const passport = require("passport")
const validator = require("validator")
const User = require("../models/User")
const sendEmail = require("../config/email")
const bcrypt = require("bcrypt")

module.exports = {
  newUser: async (req, res, next) => {
    try {
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

      const url = `http://localhost:8000/verifyEmail/${user._id}`

      sendEmail(user.email, `Welcome to {untitled budget}, ${user.name.split(' ')[0]}!`, `<p>Hi ${user.name.split(' ')[0]}, <br><br> Thank you for signing up we hope you enjoy the app! <br><br> Please verify you email here ${url} <br><br> Thanks, <br> B</p>`)

      res.status(200).json({ id: user._id, name: user.name, email: user.email })
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

      const user = await User.findOne({ email: req.body.email })
      if(user.verified === false){
        return res.json('Please verify your email before logging in')
      }

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
      res.cookie("connect.sid","", {
        httpOnly: true,
        expires: new Date(0)
      })

      req.user = null
      res.status(200).json('user has logged out')
      // req.session.destroy((err) => {
      //   if (err)
      //     console.log("Error : Failed to destroy the session during logout", err);
      //   req.user = null;
      //   return res.status(200).json('Logged out')
      // })
    }
    catch (error) {
      console.log(error)
    }
  },
  verifyEmail: async (req,res) => {
    
  },
  changePassword: async (req,res,next) => {
    if (!validator.isLength(req.body.newPassword, { min: 8 }))
      return res.status(400).json({ msg:"Your new password must be at least 8 characters" })
    if (req.body.newPassword !== req.body.confirmNewPassword)
      return res.status(400).json({ msg:"Passwords do not match" })
    
    const user = await User.findById(req.user.id)

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if(result){
        bcrypt.genSalt(10, async (err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, async (err, hash) => {
            await User.findByIdAndUpdate(req.user.id, { password: hash })

            sendEmail(user.email, 'Your password has been updated', `<p>Hi ${user.name.split(' ')[0]}, <br><br> Your password was just updated. If this was not you please reach out otherwise you may ignore this message. <br><br> Happy budgeting! <br><br> Thanks, <br> B</p>`)

            res.status(200).json('Your password has been updated')
          })
        })
      }
      else{
        return res.status(400).json('Your current password does not match what you have entered')
      }
    })
  },
  updateProfile: async (req,res) => {
    const user = await User.findByIdAndUpdate(req.user.id, { name: req.body.name, email: req.body.email })
    res.status(200).json('Profile updated')
  }
}