const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")

router.post('/newUser', userController.newUser)

module.exports = router