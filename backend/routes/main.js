const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")

router.post('/newUser', userController.newUser)
router.post('/login', userController.login)

module.exports = router