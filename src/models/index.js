const budgetModel = require("./budget.model");
const categoryModel = require("./category.model");
const expenseModel = require("./expense.model");
const organizationModel = require("./organization.model");
const orgMembershipModel = require("./orgMembership.model");
const userModel = require("./user.model");

// this is the index.js file which is used for each folder which is handling multiple files like modles
module.exports = {
    budgetModel,
    categoryModel,
    expenseModel,
    organizationModel,
    orgMembershipModel,
    userModel,
}

