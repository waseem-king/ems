// ==========================================================================
// Models Index - Export All Model Modules
// ==========================================================================

const budgetModel = require("./budget.model");
const categoryModel = require("./category.model");
const expenseModel = require("./expense.model");
const organizationModel = require("./organization.model");
const orgMembershipModel = require("./orgMembership.model");
const userModel = require("./user.model");

// ==========================================================================

module.exports = {
    budgetModel,
    categoryModel,
    expenseModel,
    organizationModel,
    orgMembershipModel,
    userModel,
};
