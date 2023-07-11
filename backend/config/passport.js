const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() }).exec()
        
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` })
        }
        if (!user.password) {
          return done(null, false, { msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile."
          })
        }

        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err)
          }
          if (isMatch) {
            return done(null, user)
          }
          return done(null, false, { msg: "Invalid email or password." })
        })
      } 
      catch (error) {
        return done(error)
      }
    })
  )

  passport.serializeUser((user, done) => {
    console.log(`Serializing user ${user.id}...`)
    return done(null, user.id);
  })

  passport.deserializeUser( async (id, done) => {
      console.log(`Desearializing user ${id}...`)
      const user = await User.findById(id)
      if(user){
        return done(null, {id: user.id, email: user.email})
      }
      else{
        return done(new Error('No user with this id found'))
      }
    
  })
}
