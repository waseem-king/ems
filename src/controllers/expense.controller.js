// Expense Controller - CRUD Operations for Expenses

const AppError = require("../middleware/appError");
const { expenseServices } = require("../services");
const newExpenseServices = new expenseServices();
const asyncHandler = require("../utils/asyncHandler");

class ExpenseController {

    // ----------------------------- Create Expense -----------------------------
    createExpense = asyncHandler(async (req, res) => {
        const data = {
            ...req.body,
            ownerType: req.body.ownerType,
            ownerId: req.user.id,
            createdBy: req.user.id
        };

        const expns = await newExpenseServices.createExpense(data);
        res.json({ status: "success", data: expns });
    });


    // ----------------------------- Get All Expenses for User -----------------------------
    getMyExpenses = asyncHandler(async (req, res) => {
        const expns = await newExpenseServices.getAllByOwner(req.body.ownerType, req.user.id);

        if (!Object.keys(expns).length) {
            throw new AppError("Expense Not Found", 404);
        }

        res.json({ status: "success", data: expns });
    });


    // ----------------------------- Get Single Expense -----------------------------
    getSingleExpense = asyncHandler(async (req, res) => {
        const ownerId = req.user.id;
        const expns = await newExpenseServices.getByIdAndOwner(req.params.id, ownerId);
        res.json({ status: "success", data: expns });
    });


    // ----------------------------- Update Expense -----------------------------
    updateExpenses = asyncHandler(async (req, res) => {
        const expns = await newExpenseServices.updateByIdAndOwner(
            req.params.id,
            req.user.id,
            req.body,
        );
        res.json({ status: "success", data: expns });
    });


    // ----------------------------- Delete Expense -----------------------------
    deleteExpense = asyncHandler(async (req, res) => {
        const msg = await newExpenseServices.deleteByIdAndOwner(
            req.params.id,
            req.user.id,
        );
        res.json({ status: "success", data: msg });
    });

    // expense aggregation controller here
    expenseDashboard = asyncHandler(async (req, res) => {
        const msg = await newExpenseServices.getExpenseDashboard(req.user.ownerType, req.user.id)
        res.json({ status: "success", data: msg });
    });

}

module.exports = ExpenseController;

