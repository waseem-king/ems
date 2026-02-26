

// ==========================================================================
// Auth Routes - Authentication Endpoints
// ==========================================================================

const express = require("express");
const router = express.Router();

// ----------------------------- Controllers -----------------------------
const authController = require("../controllers/auth.controller");

// ----------------------------- External -----------------------------
const { requiresAuth } = require("express-openid-connect");

// ==========================================================================
// Public Routes
// ==========================================================================

// Register new user
router.post("/register", authController.registerUser);

// User login
router.post("/login", authController.loginUser);

// ==========================================================================
// Protected Routes (Requires Auth)
// ==========================================================================

// Get current user profile
router.get("/me", requiresAuth(), authController.getMe);

// Update current user profile
router.patch("/me", requiresAuth(), authController.updateMe);

// Delete current user profile
router.delete("/me", requiresAuth(), authController.deleteMe);

// ==========================================================================

module.exports = router;
