
// this is the module which will manupulate with the database
const logger = require("../config/logger");
const AppError = require("../middleware/appError");
const budgetModel = require("../models/budget.model");

class BudgetRepo{
    async setBudget(bdgt){
        const { ownerId, year, month} = bdgt
        console.log(`Owner ID = ${ownerId}, Year ${year}, Month ${month}`)
        const exist = await budgetModel.findOne({ ownerId, year, month});
        console.log("Budget = ", exist)
        if(exist){
            throw new AppError("Budget for this month already exist you can only update it", 401)
        }
        const budget = await budgetModel.create(bdgt);
        return budget;
    }
    async getBudget(ownerId, bdgtId){
        const budget = await budgetModel.findOne({_id:bdgtId, ownerId})
        return budget;
    }
    // we can also update the budget no need to delete the budget
    async updateBudget(ownerId, bdgtId, data){
        const budget = await budgetModel.findByIdAndUpdate(
            {_id: bdgtId, ownerId},
            data,
            {
                new:true, runValidators:true
            }
        )
        return budget;
    }
}

module.exports = new BudgetRepo;