const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/category")

router.get('/', categoryController.getCategories)
router.post('/new', categoryController.newCategory)

module.exports = router