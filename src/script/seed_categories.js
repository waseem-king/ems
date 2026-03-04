require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/category.model");
const User = require("../models/user.model");
const Organization = require("../models/organization.model");

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://waseem_db_user:wasi7Allah@cluster0.qvgcdm6.mongodb.net/test`;

async function seedCategories() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected for Category seeding");

    // 1. Get the target owners
    const firstUser = await User.findOne({ownerType:"user"}).sort({ createdAt: 1 });
    const firstOrg = await Organization.findOne().sort({ createdAt: 1 }).skip(1);

    if (!firstUser || !firstOrg) {
      console.error("❌ Error: You must seed Users and Organizations before Categories!");
      process.exit(1);
    }

    const categories = [];

    // 2. Define standard categories for a Personal User
    // const userCatNames = ["Food & Drinks", "Transportation", "Rent", "Entertainment", "Shopping"];
    const userCatNames = [
  "Food & Drinks", "Transportation", "Rent", "Entertainment", "Shopping",
  "Groceries", "Utilities", "Healthcare", "Education", "Household Supplies",
  "Vehicle Maintenance", "Insurance", "Internet & Mobile", "Gifts", "Savings"
];

    userCatNames.forEach(name => {
      categories.push({
        name: name,
        ownerId: firstUser._id,
        ownerType: "user",
        icon: "user-icon-path", // Optional: depending on your schema
        isActive: true
      });
    });

    // 3. Define standard categories for an Organization
    // const orgCatNames = ["Office Supplies", "Salaries", "Utilities", "Marketing", "Travel"];
    const orgCatNames = [
  "Office Supplies", "Salaries", "Utilities", "Marketing", "Travel",
  "Rent & Lease", "Employee Benefits", "Insurance", "Professional Services",
  "Software Subscriptions", "Inventory", "Shipping", "Taxes & Licenses", "Maintenance"
];

    orgCatNames.forEach(name => {
      categories.push({
        name: name,
        ownerId: firstOrg._id,
        ownerType: "organization",
        icon: "org-icon-path",
        isActive: true
      });
    });

    // 4. Clean old categories (optional) and insert new ones
    // await Category.deleteMany({}); 
    const res = await Category.insertMany(categories);
    
    console.log(`🎉 Success: ${res.length} Categories created!`);
    console.log(`- ${userCatNames.length} for User: ${firstUser.name}`);
    console.log(`- ${orgCatNames.length} for Organization: ${firstOrg.name}`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
}

seedCategories();