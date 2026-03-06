// User Routes - User Management Endpoints

const express = require("express");
const router = express.Router();

// ----------------------------- Middleware ------------------------------
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");

// ----------------------------- Controllers -----------------------------
const { userController } = require("../controllers");
const newUserController = new userController();

// ----------------------------- Validators -----------------------------
const { createUserValidator } = require("../validators/user.validator");


// Routes

// Create new user
router.post("/users", createUserValidator, validate, newUserController.createUser);

// User login
router.post("/user", validate, newUserController.loginUser);

// Get all users
router.get("/users", protect, newUserController.findAll);

// Get user by ID
router.get("/users/:id", protect, newUserController.findExistingUser);

// Get user by email
router.get("/users/email/:email", protect, newUserController.findByEmail);

// Update user by ID
router.put("/users/:id", protect, newUserController.updateById);

// Delete user by ID
router.delete("/users/:id", protect, newUserController.deleteById);

                        // Routes for aggregation

router.get("/users/me/myDashboard", protect, newUserController.myDashboard);

module.exports = router;

