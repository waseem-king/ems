// ==========================================================================
// User Routes - User Management Endpoints
// ==========================================================================

const express = require("express");
const router = express.Router();

// ----------------------------- Middleware ------------------------------
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");

// ----------------------------- Controllers -----------------------------
const { userController } = require("../controllers");

// ----------------------------- Validators -----------------------------
const { createUserValidator } = require("../validators/user.validator");

// ==========================================================================
// Routes
// ==========================================================================

// Create new user
router.post("/users", createUserValidator, validate, userController.createUser);

// User login
router.post("/user", validate, userController.loginUser);

// Get all users
router.get("/users", userController.findAll);

// Get user by ID
router.get("/users/:id", userController.findExistingUser);

// Get user by email
router.get("/users/email/:email", userController.findByEmail);

// Update user by ID
router.put("/users/:id", userController.updateById);

// Delete user by ID
router.delete("/users/:id", userController.deleteById);

// ==========================================================================

module.exports = router;
