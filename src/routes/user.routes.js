// ==========================================================================
// User Routes - User Management Endpoints
// ==========================================================================

const express = require("express");
const router = express.Router();

// ----------------------------- Middleware ------------------------------
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");

// ----------------------------- Controllers -----------------------------
const { userController, UserAnalyticsController } = require("../controllers");

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
router.get("/users", protect, userController.findAll);

// Get user by ID
router.get("/users/:id", protect, userController.findExistingUser);

// Get user by email
router.get("/users/email/:email", protect, userController.findByEmail);

// Update user by ID
router.put("/users/:id", protect, userController.updateById);

// Delete user by ID
router.delete("/users/:id", protect, userController.deleteById);

// ==========================================================================



// ==========================================================================
                        // Routes for aggregation
// ==========================================================================

router.get("/users/me/myDashboard", protect, UserAnalyticsController.myDashboard);



module.exports = router;
