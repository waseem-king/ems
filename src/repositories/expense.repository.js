const { expenseModel } = require("../models");
const mongoose = require("mongoose")

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

// ===========================================================================
                // Budget aggregations
// ===========================================================================
   async getExpenseDashboard(ownerType, ownerId) {
    const objectId = new mongoose.Types.ObjectId(ownerId)
    return expenseModel.aggregate([

      // 🎯 match data
      {
        $match: { ownerType, ownerId:objectId }
      },

      // 📊 run parallel aggregations
      {
        $facet: {

          // ==============================
          // OVERVIEW
          // ==============================
          overview: [
            {
              $group: {
                _id: null,
                totalExpenses: { $sum: 1 },
                totalAmount: { $sum: "$amount" },
                avgExpense: { $avg: "$amount" },
                maxExpense: { $max: "$amount" },
                minExpense: { $min: "$amount" }
              }
            }
          ],

          // ==============================
          // MONTHLY TREND
          // ==============================
          monthlySpending: [
            {
              $group: {
                _id: {
                  year: { $year: "$date" },
                  month: { $month: "$date" }
                },
                total: { $sum: "$amount" }
              }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
          ],

          // ==============================
          // CATEGORY WISE
          // ==============================
          categoryWise: [
            {
              $group: {
                _id: "$category",
                total: { $sum: "$amount" },
                count: { $sum: 1 }
              }
            },
            { $sort: { total: -1 } },

            {
              $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "_id",
                as: "category"
              }
            },
            { $unwind: "$category" },

            {
              $project: {
                _id: 0,
                category: "$category.name",
                total: 1,
                count: 1
              }
            }
          ],

          // ==============================
          // TOP EXPENSES
          // ==============================
          topExpenses: [
            { $sort: { amount: -1 } },
            { $limit: 5 }
          ],

          // ==============================
          // RECENT EXPENSES
          // ==============================
          recentExpenses: [
            { $sort: { date: -1 } },
            { $limit: 5 }
          ],

          // ==============================
          // DAILY AVG SPENDING
          // ==============================
          dailyAverage: [
            {
              $group: {
                _id: {
                  year: { $year: "$date" },
                  month: { $month: "$date" },
                  day: { $dayOfMonth: "$date" }
                },
                total: { $sum: "$amount" }
              }
            },
            {
              $group: {
                _id: null,
                dailyAvg: { $avg: "$total" }
              }
            }
          ]

        }
      }
    ]);
  }
}

module.exports = new ExpensesRepo();
