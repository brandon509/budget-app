const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/category")
const { ensureAuth } = require("../middleware/auth")

router.get('/', ensureAuth, categoryController.getUserCategories)
router.post('/newCategory', ensureAuth, categoryController.newCategory)
router.put('/deleteCategory', ensureAuth, categoryController.deleteCategory)
router.put('/updateCategory', ensureAuth, categoryController.updateCategory) //edit name, joint status, split
router.put('/updateBudget', ensureAuth, categoryController.updateBudget)

module.exports = router