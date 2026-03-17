// Expense Routes - Expense Management Endpoints

const express = require("express");
const router = express.Router();


// ----------------------------- Middleware ------------------------------
const { protect } = require("../middleware/auth.middleware");

// ----------------------------- Controllers -----------------------------
const { expenseController } = require("../controllers");
const newExpenseController = new expenseController();
const { createExpenseValidator, expenseIdParamValidator } = require("../validators/expense.validator");

// Routes

// Create new expense (protected)
router.post("/expenses", protect, createExpenseValidator, newExpenseController.createExpense);

// expense aggregation route
router.get(
    "/expenses/expenseDashboard",
    protect,
    newExpenseController.expenseDashboard
)

// Get all expenses for current user (protected)
router.get("/expenses", protect,  newExpenseController.getMyExpenses);

// Get single expense by ID (protected)
router.get("/expenses/:id", protect, expenseIdParamValidator, newExpenseController.getSingleExpense);

// Update expense by ID (protected)
router.put("/expenses/:id", protect, createExpenseValidator,  expenseIdParamValidator, newExpenseController.updateExpenses);

// Delete expense by ID (protected)
router.delete("/expenses/:id", protect, expenseIdParamValidator, newExpenseController.deleteExpense);


module.exports = router;

