require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
// const User = require("../models/User");
// const Organization = require("../models/Organization");
const User = require("../models/user.model");
const Organization = require("../models/organization.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ems";

// ---------------- CONNECT TO DB ----------------
async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");
}

// ---------------- GENERATE USERS ----------------
function generateUsersForOrg(orgId, slug , minUsers = 5, maxUsers = 20) {
  const userCount = faker.number.int({ min: minUsers, max: maxUsers });
  const users = [];

  for (let i = 0; i < userCount; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "123456", // hashed automatically by pre-save
      organization: orgId,
      role: faker.helpers.arrayElement([
        "ceo",
        "hr",
        "team_lead",
        "senior",
        "junior",
      ]),
      employeeEmail:slug,
      phone: faker.phone.number("03#########"),
      avatar: faker.image.avatar(),
      occupation: faker.person.jobTitle(),
      isEmailVerified: faker.datatype.boolean(),
      isActive: true,
    });
  }

  return users;
}

// ---------------- SEED FUNCTION ----------------
async function seedUsers() {
  try {
    await connectDB();

    //console.log("🗑 Clearing old users...");
    //await User.deleteMany(); // optional: remove existing users

    const orgs = await Organization.find();
    console.log(`📦 Found ${orgs.length} organizations`);

    const allUsers = [];

    for (const org of orgs) {
      const users = generateUsersForOrg(org._id, org.slug, 15, 40); // random 15–40 users per org
      allUsers.push(...users);
      console.log(`Generated ${users.length} users for org: ${org.name}`);
    }

    console.log(`💾 Inserting total ${allUsers.length} users...`);
    await User.insertMany(allUsers, { ordered: false });

    console.log("🎉 Users inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();