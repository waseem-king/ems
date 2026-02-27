// ==========================================================================
// Budget Validator - Validation Rules for Budget Operations
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const { body, param } = require("express-validator")
// ==========================================================================

// Validate creation of an budget
exports.createBudgetValidator = [
    body("name")
        .notEmpty().withMessage("Name of the budget is required")
        .isLength({ min: 3 }).withMessage("Name must be greater then 3 charactors"),

    body("amount")
        .notEmpty().withMessage("Amount is required for the budget")
        .isFloat({ gt: 0 }).withMessage("Budget amount should be a positive number"),

    body("month")
        .isInt({ min: 1, max: 12 })
        .withMessage("Month must be 1–12"),

    body("year")
        .isInt({ min: 2020, max: 2100 })
        .withMessage("Enter a valid year"),

    body("ownerType")
        .notEmpty().withMessage("User type is required")
        .isIn(["user", "organization"])
]

exports.budgetIdParamValidator = [
    param("id")
        .notEmpty().withMessage("Id is required")
        .isMongoId().withMessage("In-valid mongodb id")
]