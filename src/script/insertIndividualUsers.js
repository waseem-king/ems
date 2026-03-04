// module to generate individual dummy users (not linked to organizations)
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Essential for insertMany hashing
const userModel = require("../models/user.model");
const { faker } = require("@faker-js/faker");

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://waseem_db_user:wasi7Allah@cluster0.qvgcdm6.mongodb.net/test`;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected for Individual User Seeding");
    } catch (err) {
        console.error("Connection error:", err);
        process.exit(1);
    }
}

const generateIndividualUsers = async (count = 5000) => {
    const users = [];
    
    // Hash once to save massive amounts of CPU time during the loop
    const hashedPassword = await bcrypt.hash("123456", 12);
    
    // Custom occupations for individuals
    const individualJobs = ["Student", "Housewife", "Taxi Driver", "Shop Owner", "Freelancer", "Farmer"];

    for (let i = 0; i < count; i++) {
        const name = faker.person.fullName();
        users.push({
            name: name,
            email: faker.internet.email().toLowerCase(),
            password: hashedPassword, // Using pre-hashed password
            organization: null,       // Explicitly not linked to an org
            ownerType: "user",        // Denotes an independent user
            role: "junior",           // Default role for non-org users
            phone: faker.phone.number("03#########"),
            avatar: faker.image.avatar(),
            occupation: faker.helpers.arrayElement(individualJobs), 
            about: `${name} is a hardworking individual currently active as a ${faker.helpers.arrayElement(individualJobs)}.`,
            isEmailVerified: faker.datatype.boolean(0.8), // 80% chance of being verified
            isActive: true,
            defaultCurrency: "PKR"
        });
    }
    return users;
}

async function seed() {
    try {
        await connectDB();

        console.log(`Generating ${res.length} individual users... please wait.`);
        const fakeUsers = await generateIndividualUsers(50);

        // Bulk insert for high performance
        const res = await userModel.insertMany(fakeUsers);
        
        console.log(`✅ Success: ${res.length} Individual Users (Students, Drivers, etc.) inserted successfully.`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding individual users:", error);
        process.exit(1);
    }
}

seed();