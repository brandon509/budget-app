const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/category")
const { ensureAuth } = require("../middleware/auth")

router.get('/', categoryController.getUserCategories)
router.post('/newCategory', categoryController.newCategory)
router.put('/deleteCategory', categoryController.deleteCategory)
router.put('/updateCategory', categoryController.updateCategory) //edit name, joint status, split
router.put('/updateBudget', categoryController.updateBudget)

module.exports = router