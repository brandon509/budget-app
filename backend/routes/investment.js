const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/investment");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, investmentController.get);
router.post("/new", ensureAuth, investmentController.new);
router.put("/update", ensureAuth, investmentController.update);
router.delete("/delete", ensureAuth, investmentController.delete);

module.exports = router;
