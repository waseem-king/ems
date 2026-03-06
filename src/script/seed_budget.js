require("dotenv").config();
const mongoose = require("mongoose");
const Budget = require("../models/budget.model"); // Ensure path is correct
const User = require("../models/user.model");
const Organization = require("../models/organization.model");
const { faker } = require("@faker-js/faker");

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://waseem_db_user:wasi7Allah@cluster0.qvgcdm6.mongodb.net/test`;

async function seedBudgets() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected for Budget seeding");

    // 1. Fetch first 20 Individual Users (where organization is null)
    const users = await User.find({ organization: null }).limit(20);
    
    // 2. Fetch first 20 Organizations
    const orgs = await Organization.find().limit(20);

    if (users.length === 0 && orgs.length === 0) {
      console.error("❌ No users or organizations found to link budgets to!");
      process.exit(1);
    }

    const budgets = [];
    const currentMonth = new Date().getMonth() + 1; // JS months are 0-11
    const currentYear = new Date().getFullYear();

    // 3. Generate Budgets for Users
    users.forEach((user) => {
      budgets.push({
        name: "Monthly Personal Budget",
        amount: faker.number.int({ min: 10000, max: 50000 }),
        month: currentMonth,
        year: currentYear,
        ownerType: "user",
        ownerId: user._id
      });
    });

    // 4. Generate Budgets for Organizations
    orgs.forEach((org) => {
      budgets.push({
        name: `${org.name} Operations Budget`,
        amount: faker.number.int({ min: 100000, max: 1000000 }),
        month: currentMonth,
        year: currentYear,
        ownerType: "organization",
        ownerId: org._id
      });
    });

    // 5. Insert into DB
    await Budget.deleteMany({ month: currentMonth, year: currentYear }); // Optional: clear existing for this month
    const res = await Budget.insertMany(budgets);
    
    console.log(`🎉 Success: ${res.length} Budgets created!`);
    console.log(`- ${users.length} for Individual Users`);
    console.log(`- ${orgs.length} for Organizations`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
}

seedBudgets();

