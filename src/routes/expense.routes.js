
// ==========================================================================
// Expense Routes - Expense Management Endpoints
// ==========================================================================

const express = require("express");
const router = express.Router();


// ----------------------------- Middleware ------------------------------
const { protect } = require("../middleware/auth.middleware");

// ----------------------------- Controllers -----------------------------
const { expenseController } = require("../controllers");
const { createExpenseValidator, expenseIdParamValidator } = require("../validators/expense.validator");

// ==========================================================================
// Routes
// ==========================================================================

// Create new expense (protected)
router.post("/expenses", protect, createExpenseValidator, expenseController.createExpense);

// Get all expenses for current user (protected)
router.get("/expenses", protect,  expenseController.getMyExpenses);

// Get single expense by ID (protected)
router.get("/expenses/:id", protect, expenseIdParamValidator, expenseController.getSingleExpense);

// Update expense by ID (protected)
router.put("/expenses/:id", protect, createExpenseValidator,  expenseIdParamValidator, expenseController.updateExpenses);

// Delete expense by ID (protected)
router.delete("/expenses/:id", protect, expenseIdParamValidator, expenseController.deleteExpense);

// ==========================================================================

module.exports = router;

