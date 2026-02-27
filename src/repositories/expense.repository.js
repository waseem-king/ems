const { expenseModel } = require("../models");

// this is the module to write database quries for expenses
class ExpensesRepo {
  async createExpense(data) {
    return await expenseModel.create(data);
  }
  
  async getAllByOwner(ownerType, ownerId) {
    return await expenseModel.find({ ownerType, ownerId });
  }

  async getByIdAndOwner(id, ownerId) {
    return await expenseModel.findOne({
      _id: id,
      ownerId,
    });
  }

  async updateByIdAndOwner(id, ownerId, data) {
    return await expenseModel.findByIdAndUpdate({ _id: id, ownerId }, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteByIdAndOwner(id, ownerId) {
    await expenseModel.findByIdAndDelete({
      _id: id,
      ownerId,
    });
    return { message: "Expense Deleted Successfully" };
  }
}

module.exports = new ExpensesRepo();
