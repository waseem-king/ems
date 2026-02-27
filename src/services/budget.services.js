const { budgetRepository } = require("../repositories");

class BudgetService{
    async setBudget(bdgt){
            const budget = await budgetRepository.setBudget(bdgt);
            return budget;
        }
        async getBudget(ownerId, bdgtId){
            const budget = await budgetRepository.getBudget(ownerId, bdgtId)
            return budget;
        }
        // we can also update the budget no need to delete the budget
        async updateBudget(ownerId, bdgtId, data){
            const budget = await budgetRepository.updateBudget(ownerId, bdgtId, data)
            return budget;
        }
}

module.exports = new BudgetService;