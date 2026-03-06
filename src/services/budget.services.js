const { budgetRepository } = require("../repositories");
const newBudgetRepository = new budgetRepository()
class BudgetService{
    async setBudget(bdgt){
            const budget = await newBudgetRepository.setBudget(bdgt);
            return budget;
        }
        async getBudget(ownerId, bdgtId){
            const budget = await newBudgetRepository.getBudget(ownerId, bdgtId)
            return budget;
        }
        // we can also update the budget no need to delete the budget
        async updateBudget(ownerId, bdgtId, data){
            const budget = await newBudgetRepository.updateBudget(ownerId, bdgtId, data)
            return budget;
        }

                // Budget Aggregation 
        async getBudgetDashboard(ownerType, ownerId){
            return await newBudgetRepository.getBudgetDashboard(ownerType, ownerId);
        }
}

module.exports = BudgetService;

