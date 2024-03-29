const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
const { ensureAuth } = require("../middleware/auth");

router.post("/newUser", userController.newUser);
router.put("/verify/:id", userController.verifyEmail);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.put("/resetPasswordRequest", userController.resetPasswordRequest);
router.put("/resetPassword/:ident/:time/:hash", userController.resetPassword);
router.put("/changePassword", ensureAuth, userController.changePassword);
router.put("/updateProfile", ensureAuth, userController.updateProfile);

module.exports = router;
