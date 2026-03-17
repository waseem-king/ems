// ==========================================================================
// Repositories Index - Export All Repository Modules
// ==========================================================================

const budgetRepository = require("./budget.repository");
const expenseRepository = require("./expense.repository");
const orgMemRepository = require("./orgMem.repository");
const orgsRepository = require("./orgs.repository");
const UserRepository = require("./user.repository");


// ==========================================================================

module.exports = {
    UserRepository,
    orgsRepository,
    orgMemRepository,
    expenseRepository,
    budgetRepository,
};
