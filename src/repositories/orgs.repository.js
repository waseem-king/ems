// this the module for creating repository , db manipulating 

const { default: mongoose } = require("mongoose");
const { organizationModel, expenseModel, categoryModel } = require("../models");

class OrgsRepository {
    // create an organization
    async createOrg(data) {
        const org = await organizationModel.create(data);
        return org;
    }
    async getAllOrgs() {
        return organizationModel.find();
    }
    async getOne(orgId) {
        const org = await organizationModel.findById(orgId)
        return org;
    }
    async updateOrg(orgId, data) {
        const newOrg = await organizationModel.findByIdAndUpdate(
            orgId,
            data,
            { new: true, runValidators: true }
        )
        return newOrg;
    }
    async deleteOrg(id) {
        await organizationModel.findByIdAndDelete(id)
        return { message: "Organization Deleted successfully" }
    }

    // =================================================================
    // Organization aggregation
    // =================================================================

 async getOrgDashboard(orgId) {
  return expenseModel.aggregate([

    { $match: { ownerType: "organization", ownerId: orgId } },
    {
      $facet: {

        // 1️⃣ Total Expenses
        totalExpenses: [
          {
            $group: {
              _id: null,
              totalSpent: { $sum: "$amount" }
            }
          }
        ],

        // 2️⃣ Monthly Spending
        monthlySpending: [
          {
            $group: {
              _id: {
                month: { $month: "$date" },
                year: { $year: "$date" }
              },
              totalSpent: { $sum: "$amount" }
            }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ],

        // 3️⃣ Category Wise
        categoryWiseSpending: [
          {
            $group: {
              _id: "$category",
              totalSpent: { $sum: "$amount" },
              count: { $sum: 1 }
            }
          },
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
              totalSpent: 1,
              count: 1
            }
          },
          { $sort: { totalSpent: -1 } }
        ],

        // 4️⃣ Top Employees
        topEmployees: [
          {
            $group: {
              _id: "$createdBy",
              totalSpent: { $sum: "$amount" }
            }
          },
          { $sort: { totalSpent: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "user"
            }
          },
          { $unwind: "$user" },
          {
            $project: {
              _id: 0,
              name: "$user.name",
              totalSpent: 1
            }
          }
        ],

        // 5️⃣ Avg Expense Per Employee
        avgExpensePerEmployee: [
          {
            $group: {
              _id: "$createdBy",
              totalSpent: { $sum: "$amount" }
            }
          },
          {
            $group: {
              _id: null,
              avgExpense: { $avg: "$totalSpent" }
            }
          },
          { $project: { _id: 0, avgExpense: 1 } }
        ]

      }
    }
  ]);
}
}


module.exports = new OrgsRepository;

