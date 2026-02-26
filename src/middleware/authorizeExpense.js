// ==========================================================================
// Authorize Expense Middleware - Verify Expense Ownership
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const { expenseModel } = require("../models");

// ==========================================================================

/**
 * Middleware to verify user is the owner of the expense
 */
module.exports = async (req, res, next) => {
    const expense = await expenseModel.findById(req.params.id);

    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    }

    const isOwner = expense.ownerId.toJSON() === req.user.id || 
                    expense.ownerId.toString() === req.user.orgId;

    if (!isOwner) {
        return res.status(403).json({ message: "Not authorized" });
    }

    req.expense = expense;
    next();
};
