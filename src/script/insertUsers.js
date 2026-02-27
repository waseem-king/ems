// this is the module to generate many dummy users and insert them in the database
require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const organizationModel = require("../models/organization.model");
const { faker } = require("@faker-js/faker");

const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/ems`;

// connect with database
async function connectDB() {
    await mongoose.connect(MONGO_URI);
    console.log("Mongo db connected")
}

const generateUsers = (count = 5000) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: "123456",
            phone: faker.phone.number("03#########"),
            avatar: faker.image.avatar(),
            occupation: faker.person.jobTitle()
        })
    }
    return users;
}

async function seed() {
    try {
        await connectDB();

        // console.log("🗑 Clearing old data...");
        // await userModel.deleteMany();

        // generate dummy usrs
        const fakeUsers = await generateUsers()
        // insert users in database
        const res = await userModel.insertMany(fakeUsers);
        console.log(`Fake Users ${res.length} inserted in db successfully`)
        process.exit(1);
    } catch (error) {
        console.error(error || "Error connecting db")
        process.exit(1);
    }
}

seed()
