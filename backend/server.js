const express = require("express")
const app = express()
const mongoose = require("mongoose")
const connectDB = require("./config/database")
const mainRoutes = require("./routes/main")
const categoryRoutes = require("./routes/category")
const amountRoutes = require("./routes/amount")

const dotenv = require('dotenv').config()

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//app.use("/", mainRoutes)
app.use("/category", categoryRoutes)
//app.use("/amount", amountRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})