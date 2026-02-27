require("dotenv").config();
const mongoose = require("mongoose");
const Expense = require("../models/expense.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");
const { faker } = require("@faker-js/faker");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ems";

// ---------------- CONNECT TO DB ----------------
async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");
}

// ---------------- RANDOM ITEM ----------------
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------- GENERATE PARTICIPANTS ----------------
function generateParticipants(users) {
  const num = Math.floor(Math.random() * 5) + 2; // 2-6 participants
  const participants = [];
  const selectedUsers = faker.helpers.shuffle(users).slice(0, num);

  selectedUsers.forEach(user => {
    const amountOwed = faker.number.int({ min: 50, max: 500 });
    participants.push({
      name: user.name,
      isUser: true,
      userId: user._id,
      paidAmount: faker.number.int({ min: 0, max: amountOwed }),
      amountOwed,
      paidAt: faker.datatype.boolean() ? faker.date.recent(10) : null
    });
  });

  return participants;
}

// ---------------- GENERATE EXPENSES ----------------
async function generateExpenses() {
  try {
    await connectDB();

    const users = await User.find();
    const categories = await Category.find();

    if (!users.length || !categories.length) {
      console.error("❌ Users or Categories not found in DB");
      process.exit(1);
    }

    const expenses = [];

    // 50 expenses WITHOUT participants
    for (let i = 0; i < 50; i++) {
      const owner = randomItem(users);
      expenses.push({
        title: faker.commerce.productName(),
        amount: faker.number.int({ min: 100, max: 5000 }),
        category: randomItem(categories)._id,
        ownerType: "user",
        ownerId: owner._id,
        createdBy: owner._id,
        note: faker.lorem.sentence(),
        splitType: "equal",
        participants: [] // no participants
      });
    }

    // 50 expenses WITH participants
    for (let i = 0; i < 50; i++) {
      const owner = randomItem(users);
      expenses.push({
        title: faker.commerce.productName(),
        amount: faker.number.int({ min: 100, max: 5000 }),
        category: randomItem(categories)._id,
        ownerType: "user",
        ownerId: owner._id,
        createdBy: owner._id,
        note: faker.lorem.sentence(),
        splitType: randomItem(["equal", "percentage", "custom"]),
        participants: generateParticipants(users)
      });
    }

    // Insert into DB
    await Expense.insertMany(expenses);
    console.log("🎉 100 dummy expenses inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error generating expenses:", err);
    process.exit(1);
  }
}

generateExpenses();