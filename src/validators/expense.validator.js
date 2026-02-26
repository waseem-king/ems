// ==========================================================================
// Expense Validator - Validation Rules for Expense Operations
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const { body, param } = require("express-validator")
// ==========================================================================

// Validate creation of an expense

exports.createExpenseValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 2 })
        .withMessage("Title must be at least two charactors"),

    body("amount")
        .notEmpty().withMessage("Amount should be given for the record of the expense")
        .isFloat({ gt: 0 }).withMessage("Total number must be greater then 0"),

    body("splitType")
        .notEmpty().withMessage("Split type must be provided for shring expense")
        .isIn(["equal", "percentage", "custom"])
        .withMessage("Split type must be equal , percentage or custom"),

    body("participants")
        .isArray({ min: 1 })
        .withMessage("Al least 1 participant is required"),

    body("participants.*.name")
        .notEmpty()
        .withMessage("Participant name is required"),

    body("participants.*.percentage")
        .optional()
        .isFloat({ gt: 0, lt: 100 })
        .withMessage("Participant percentage must be between 0 and 100"),

    body("participants.*.amountOwed")
        .optional()
        .isFloat({ gt: 0 })
        .withMessage("Participant amountOwed must be greater than 0"),

    body("ownerType")
        .notEmpty()
        .withMessage("Owner type is required"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
];


// Validate `id` param for update/delete/fetch
exports.expenseIdParamValidator = [
  param("id")
    .notEmpty()
    .withMessage("Expense ID is required")
    .isMongoId()
    .withMessage("Invalid Expense ID format"),
];
