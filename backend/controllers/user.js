const passport = require("passport")
const validator = require("validator")
const User = require('../models/User')

// module.exports = {
//     newUser: async (req,res) => {
//         try {
//             let user = await User.create({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password
//             })

//             res.json("user added")
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

exports.newUser = (req, res, next) => {
    console.log(req.body)
    if (!validator.isEmail(req.body.email))
      return res.status(400).json({ msg:"Please enter a valid email address" });
    if (!validator.isLength(req.body.password, { min: 8 }))
      return res.status(400).json({ msg:"Password must be at least 8 characters long" })
    if (req.body.password !== req.body.confirmPassword)
      return res.status(400).json({ msg:"Passwords do not match" })
  
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
  
    User.findOne(
      { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
      (err, existingUser) => {
        if (err) {
          return next(err);
        }
        if (existingUser) {
          return res.status(400).json("Account with that email address or username already exists")
        }
        user.save((err) => {
          if (err) {
            return next(err);
          }
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            res.status(200).json({id: req.user.id, name: req.user.userName})
          });
        });
      }
    );
  };