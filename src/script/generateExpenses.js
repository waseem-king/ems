require("dotenv").config();
const mongoose = require("mongoose");
const Expense = require("../models/expense.model");
const User = require("../models/user.model");
const Organization = require("../models/organization.model");
const Category = require("../models/category.model");
const { faker } = require("@faker-js/faker");

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://waseem_db_user:wasi7Allah@cluster0.qvgcdm6.mongodb.net/test`;

async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");
}

async function generateExpenses() {
  try {
    await connectDB();

    // 1. Get the target owners
    const firstUser = await User.findOne({ownerType:"user"}).sort({ createdAt: 1 });
    const firstOrg = await Organization.findOne().sort({ createdAt: 1 }).skip(1);

    if (!firstUser || !firstOrg) {
        console.error("❌ Need at least one user and one organization in DB first!");
        process.exit(1);
    }

    const expenses = [];

    // --- 20 EXPENSES FOR 1st USER (Over different dates) ---
    // We fetch categories owned by this user
    const userCategories = await Category.find({ ownerId: firstUser._id });
    
    for (let i = 0; i < 20; i++) {
      expenses.push({
        title: faker.commerce.productName(),
        amount: faker.number.int({ min: 100, max: 2000 }),
        // If user has no specific categories, we'd need a fallback or ensure they exist
        category: userCategories.length > 0 ? faker.helpers.arrayElement(userCategories)._id : null,
        ownerType: "user",
        ownerId: firstUser._id,
        createdBy: firstUser._id,
        note: faker.lorem.sentence(),
        splitType: "equal",
        // Spread dates over the last 2 years
        createdAt: faker.date.between({ from: '2024-01-01', to: new Date() }),
        participants: []
      });
    }

    // --- 30 EXPENSES FOR 1st ORG (Over different dates) ---
    const orgCategories = await Category.find({ ownerId: firstOrg._id });

    for (let i = 0; i < 30; i++) {
      expenses.push({
        title: faker.company.buzzPhrase(),
        amount: faker.number.int({ min: 1000, max: 50000 }),
        category: orgCategories.length > 0 ? faker.helpers.arrayElement(orgCategories)._id : null,
        ownerType: "organization",
        ownerId: firstOrg._id,
        createdBy: firstUser._id, // Usually the CEO/Admin creates it
        note: faker.lorem.sentence(),
        splitType: "equal",
        // Spread dates over several months
        createdAt: faker.date.past({ years: 1 }),
        participants: []
      });
    }

    // Insert into DB
    await Expense.insertMany(expenses);
    console.log(`🎉 Success: 20 User expenses and 30 Org expenses created!`);
    process.exit(0);

  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

generateExpenses();