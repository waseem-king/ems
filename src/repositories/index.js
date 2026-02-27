// ==========================================================================
// Repositories Index - Export All Repository Modules
// ==========================================================================

const budgetRepository = require("./budget.repository");
const expenseRepository = require("./expense.repository");
const orgMemRepository = require("./orgMem.repository");
const orgsRepository = require("./orgs.repository");
const userRepository = require("./user.repository");

// ==========================================================================

module.exports = {
    userRepository,
    orgsRepository,
    orgMemRepository,
    expenseRepository,
    budgetRepository,
};
