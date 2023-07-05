const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")

router.post('/newUser', userController.newUser)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

module.exports = router