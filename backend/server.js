const express = require("express")
const app = express()
const mongoose = require("mongoose")
const connectDB = require("./config/database")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const mainRoutes = require("./routes/main")
const categoryRoutes = require("./routes/category")
const amountRoutes = require("./routes/amount")
const cors = require("cors")

const dotenv = require('dotenv').config()

require("./config/passport")(passport)

connectDB()

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
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