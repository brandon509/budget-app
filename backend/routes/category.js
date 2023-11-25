const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/category")
const { ensureAuth } = require("../middleware/auth")

//need to add ensureAuth to each of these

router.get('/', ensureAuth, categoryController.get)
router.post('/new', ensureAuth, categoryController.new)
router.put('/update', ensureAuth, categoryController.update) //edit name, joint split
router.put('/delete', ensureAuth, categoryController.delete)

module.exports = router