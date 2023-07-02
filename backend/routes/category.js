const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/category")

router.get('/', categoryController.getUserCategories)
router.post('/newCategory', categoryController.newCategory)
router.put('/deleteCategory', categoryController.deleteCategory)
router.put('/updateCategory', categoryController.updateCategory) //edit name, joint status, split, or budget

module.exports = router