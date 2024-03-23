const express = require("express");
const router = express.Router();
const amountController = require("../controllers/amount");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, amountController.get);
router.post("/new", ensureAuth, amountController.new);
router.put("/update", ensureAuth, amountController.update);
router.delete("/delete", ensureAuth, amountController.delete);

module.exports = router;
