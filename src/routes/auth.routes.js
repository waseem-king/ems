

const express = require("express");
const authController = require("../controllers/auth.controller");
const AppError = require("../middleware/appError");
const logger = require("../config/logger");
const { requiresAuth } = require("express-openid-connect");
const router = express.Router()

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

router.get("/me", requiresAuth(), authController.getMe);
router.patch("/me", requiresAuth(), authController.updateMe);
router.delete("/me", requiresAuth() ,authController.deleteMe);

module.exports = router;