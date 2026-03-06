require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Added for manual hashing
const userModel = require("../models/user.model");
const organizationModel = require("../models/organization.model");
const { faker } = require("@faker-js/faker");

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://waseem_db_user:wasi7Allah@cluster0.qvgcdm6.mongodb.net/test`;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Connection error:", err);
        process.exit(1);
    }
}

const generateOrgUsers = async (organizations) => {
    const allUsers = [];
    const roles = ['ceo', 'hr', 'captain', 'senior', 'junior'];
    
    // We hash the password once here to save CPU cycles
    const hashedPassword = await bcrypt.hash("123456", 12);

    for (const org of organizations) {
        // Generate 20 users for each organization
        for (let i = 0; i < 20; i++) {
            const email = faker.internet.email();
            allUsers.push({
                name: faker.person.fullName(),
                email: email.toLowerCase(),
                password: hashedPassword, // Manually hashed for insertMany
                organization: org._id,
                ownerType: "organization",
                role: faker.helpers.arrayElement(roles),
                employeeEmail: email.toLowerCase(),
                about: faker.lorem.sentence(),
                phone: faker.phone.number("03#########"),
                avatar: faker.image.avatar(),
                occupation: faker.person.jobTitle(),
                isEmailVerified: true,
                isActive: true
            });
        }
    }
    return allUsers;
};

async function seed() {
    try {
        await connectDB();

        // 1. Get all organizations from the DB
        const orgs = await organizationModel.find({});
        if (orgs.length === 0) {
            console.log("No organizations found. Please seed organizations first!");
            process.exit(1);
        }

        console.log(`Found ${orgs.length} organizations. Generating users...`);

        // 2. Generate the users
        const fakeUsers = await generateOrgUsers(orgs);

        // 3. Insert into database
        // Note: insertMany is used for speed, which is why we hashed manually above
        const res = await userModel.insertMany(fakeUsers);
        
        console.log(`✅ Success: ${res.length} users inserted (${orgs.length} orgs x 20 users each)`);
        process.exit(0);

    } catch (error) {
        console.error("Error during seeding:", error);
        process.exit(1);
    }
}

seed();

