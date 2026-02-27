// ==========================================================================
// Services Index - Export All Service Modules
// ==========================================================================

const authService = require("./auth.service");
const budgetServices = require("./budget.services");
const expenseServices = require("./expense.services");
const orgMemServices = require("./orgMem.services");
const orgsServices = require("./orgs.services");
const userServices = require("./user.services");

// ==========================================================================

module.exports = {
    authService,
    orgsServices,
    orgMemServices,
    userServices,
    expenseServices,
    budgetServices,
};
