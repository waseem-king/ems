
// this is the module which will manupulate with the database
const { default: mongoose } = require("mongoose");
const logger = require("../config/logger");
const AppError = require("../middleware/appError");
const budgetModel = require("../models/budget.model");

class BudgetRepo {
  async setBudget(bdgt) {
    const { ownerId, year, month } = bdgt
    const exist = await budgetModel.findOne({ ownerId, year, month });
    console.log("Budget = ", exist)
    if (exist) {
      throw new AppError("Budget for this month already exist you can only update it", 401)
    }
    const budget = await budgetModel.create(bdgt);
    return budget;
  }
  async getBudget(ownerId, bdgtId) {
    const budget = await budgetModel.findOne({ _id: bdgtId, ownerId })
    return budget;
  }
  // we can also update the budget no need to delete the budget
  async updateBudget(ownerId, bdgtId, data) {
    const budget = await budgetModel.findByIdAndUpdate(
      { _id: bdgtId, ownerId },
      data,
      {
        new: true, runValidators: true
      }
    )
    return budget;
  }

  // ===========================================================================
  // Budget aggregations
  // ===========================================================================
  async getBudgetDashboard(ownerType, ownerId) {
    const objectId = new mongoose.Types.ObjectId(ownerId)
    return budgetModel.aggregate([


      // 🎯 get budgets of user/org
      {
        $match: { ownerType, ownerId: objectId }
      },

      // 💰 attach expenses under each budget
      {
        $lookup: {
          from: "expenses",
          let: { budgetCategory: "$category", start: "$startDate", end: "$endDate", owner: "$ownerId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$category", "$$budgetCategory"] },
                    { $eq: ["$ownerId", "$$owner"] },
                    { $gte: ["$date", "$$start"] },
                    { $lte: ["$date", "$$end"] }
                  ]
                }
              }
            }
          ],
          as: "expenses"
        }
      },

      // 📊 compute totals
      {
        $addFields: {
          actualSpent: { $sum: "$expenses.amount" }
        }
      },

      // ➗ usage %
      {
        $addFields: {
          remainingAmount: { $subtract: ["$amount", "$actualSpent"] },
          usagePercentage: {
            $multiply: [
              { $divide: ["$actualSpent", "$amount"] },
              100
            ]
          }
        }
      },

      // 🚦 status
      {
        $addFields: {
          status: {
            $switch: {
              branches: [
                { case: { $gte: ["$usagePercentage", 100] }, then: "over" },
                { case: { $gte: ["$usagePercentage", 80] }, then: "near" }
              ],
              default: "under"
            }
          }
        }
      },

      // Use the month/year fields to create start/end dates dynamically
      {
        $addFields: {
          startDate: { $dateFromParts: { year: "$year", month: "$month", day: 1 } },
          endDate: {
            $dateSubtract: {
              startDate: { $dateFromParts: { year: "$year", month: { $add: ["$month", 1] }, day: 1 } },
              unit: "day",
              amount: 1
            }
          }
        }
      },
      // 📅 time progress
      {
        $addFields: {
          totalDays: {
            $dateDiff: { startDate: "$startDate", endDate: "$endDate", unit: "day" }
          },
          daysPassed: {
            $dateDiff: { startDate: "$startDate", endDate: new Date(), unit: "day" }
          }
        }
      },

      // 📈 monthly trend inside budget
      {
        $addFields: {
          monthlySpending: {
            $map: {
              input: "$expenses",
              as: "exp",
              in: {
                month: { $month: "$$exp.date" },
                year: { $year: "$$exp.date" },
                amount: "$$exp.amount"
              }
            }
          }
        }
      },

      // 🔝 top expenses
      {
        $addFields: {
          topExpenses: {
            $slice: [
              {
                $sortArray: {
                  input: "$expenses",
                  sortBy: { amount: -1 }
                }
              },
              5
            ]
          }
        }
      },

      // 🧹 final shape
      {
        $project: {
          name: 1,
          amount: 1,
          actualSpent: 1,
          remainingAmount: 1,
          usagePercentage: 1,
          status: 1,
          totalDays: 1,
          daysPassed: 1,
          monthlySpending: 1,
          topExpenses: 1
        }
      }
    ]);
  }
}

module.exports = new BudgetRepo;

