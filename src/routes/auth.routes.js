// Auth Routes - Authentication Endpoints


const express = require("express");
const router = express.Router();

// ----------------------------- Controllers -----------------------------
const { authController } = require("../controllers");
const newAuthController = new authController();

// ----------------------------- External -----------------------------
const { requiresAuth } = require("express-openid-connect");


// Public Routes

// Register new user
router.post("/register", newAuthController.registerUser);

// User login
router.post("/login", newAuthController.loginUser);

// Protected Routes (Requires Auth)

// Get current user profile
router.get("/me", requiresAuth(), newAuthController.getMe);

// Update current user profile
router.patch("/me", requiresAuth(), newAuthController.updateMe);

// Delete current user profile
router.delete("/me", requiresAuth(), newAuthController.deleteMe);


module.exports = router;
