const express = require("express")
const router = express.Router()
const amountController = require("../controllers/amount")

router.get('/', amountController.getAmounts)
router.post('/addAmount', amountController.addAmount)
router.put('editAmount', amountController.editAmount)
router.delete('deleteAmount', amountController.deleteAmount)

module.exports = router