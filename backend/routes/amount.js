const express = require("express")
const router = express.Router()
const amountController = require("../controllers/amount")
const { ensureAuth } = require("../middleware/auth")

router.get('/', ensureAuth, amountController.getAmounts)
router.post('/addAmount', ensureAuth, amountController.addAmount)
router.put('/editAmount', ensureAuth, amountController.editAmount)
router.delete('/deleteAmount', ensureAuth, amountController.deleteAmount)

module.exports = router