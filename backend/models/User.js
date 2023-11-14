const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    lastLoginDate: {
      type: Date,
      default: Date.now()
    },
    lastLogoutDate: {
      type: Date
    }
})

// New user password hash middleware
UserSchema.pre("save", function save(next) {
    const user = this
    if (!user.isModified("password")) {
      return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  })

//   UserSchema.pre("findOneAndUpdate", function(next) {
//     const password = this.getUpdate().password
//     console.log(password)
//     if (!password) {
//         return next();
//     }
//     try {
//         const salt = bcrypt.genSaltSync();
//         const hash = bcrypt.hashSync(password, salt);
//         this.getUpdate().password = hash;
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

// Update user password hash middleware
UserSchema.pre("findOneAndUpdate", function(next) {
  const password = this.getUpdate().password
  if (!password) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      this.getUpdate().password = hash
      next()
    })
  })
})

// Helper method for validating user's password
UserSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
    cb
  ) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  };

module.exports = mongoose.model("User", UserSchema)