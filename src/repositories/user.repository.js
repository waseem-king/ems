
const auth0Model = require("../models/auth0.model");
const { userModel, expenseModel, budgetModel } = require("../models/index");
const mongoose = require("mongoose");
// this is the model for auth0 , the users sign up using auth0 will use this model


class UserRepository {
    // store user signed up using auth0
    async createByAuth0Id(auth0Id, data) {
        return await auth0Model.create({ auth0Id, data })
    }
    // find the stored user
    async findByAuth0Id(auth0Id) {
        return await auth0Model.findOne({ auth0Id })
    }
    // update using auth0 
    async updateByAuth0Id(auth0Id, data) {
        return await auth0Model.findOneAndUpdate(
            { auth0Id },
            data,
            { new: true, runValidators: true }
        )
    }
    // delte using auth0
    async deleteByAuth0Id(auth0Id) {
        return await auth0Model.findOneAndDelete({ auth0Id })
    }


    async create(userData) {
        return await userModel.create(userData)
    }
    async findExistingUser(id) {
        return await userModel.findById(id)
    }
    async findAll() {
        return await userModel.find()
    }
    async findByEmail(email) {
        return await userModel.findOne({ email }).select("+password")
    }
    async deleteById(id) {
        await userModel.findByIdAndDelete(id)
        return { message: "User deleted successfully" }
    }
    async updateById(id, data) {
        return await userModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    }


}

// ==============================================================

// Aggregations

// ==============================================================
class UserAnalytics {
    // monthly spending for a single user
async getUserDashboard(userId, month, year) {

  const objectId = new mongoose.Types.ObjectId(userId);

  const last7days = new Date();
  last7days.setDate(last7days.getDate() - 7);

  return expenseModel.aggregate([

    {
      $match: {
        ownerId: objectId,
        ownerType: "user"
      }
    },

    {
      $facet: {

        // ==========================
        // 1️⃣ Monthly Spending
        // ==========================
        monthlySpending: [
          {
            $group: {
              _id: {
                month: { $month: "$date" },
                year: { $year: "$date" }
              },
              totalSpent: { $sum: "$amount" },
              count: { $sum: 1 }
            }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ],

        // ==========================
        // 2️⃣ Category Wise
        // ==========================
        categoryWise: [
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category"
            }
          },
          { $unwind: "$category" },
          {
            $group: {
              _id: "$category.name",
              total: { $sum: "$amount" }
            }
          },
          { $sort: { total: -1 } }
        ],

        // ==========================
        // 3️⃣ Top Expenses
        // ==========================
        topExpenses: [
          { $sort: { amount: -1 } },
          { $limit: 5 },
          { $project: { title: 1, amount: 1, date: 1 } }
        ],

        // ==========================
        // 4️⃣ Last 7 Days
        // ==========================
        last7Days: [
          { $match: { date: { $gte: last7days } } },
          {
            $group: {
              _id: { $dayOfMonth: "$date" },
              total: { $sum: "$amount" }
            }
          },
          { $sort: { _id: 1 } }
        ],

        // ==========================
        // 5️⃣ Avg Daily (Selected Month)
        // ==========================
        avgDailySpending: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $month: "$date" }, month] },
                  { $eq: [{ $year: "$date" }, year] }
                ]
              }
            }
          },
          {
            $group: {
              _id: null,
              totalSpent: { $sum: "$amount" },
              days: { $addToSet: { $dayOfMonth: "$date" } }
            }
          },
          {
            $project: {
              avgPerDay: {
                $cond: [
                  { $gt: [{ $size: "$days" }, 0] },
                  { $divide: ["$totalSpent", { $size: "$days" }] },
                  0
                ]
              }
            }
          }
        ]

      }
    }
  ]);
}
}



module.exports = {
    UserRepository: new UserRepository(),
    UserAnalytics: new UserAnalytics()
};

