const express = require("express")
const app = express()
const mongoose = require("mongoose")
const connectDB = require("./config/database")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const mainRoutes = require("./routes/main")
const categoryRoutes = require("./routes/category")
const amountRoutes = require("./routes/amount")

const dotenv = require('dotenv').config()

require("./config/passport")(passport)

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

app.use(passport.initialize())
app.use(passport.session())

app.use("/", mainRoutes)
app.use("/category", categoryRoutes)
//app.use("/amount", amountRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})