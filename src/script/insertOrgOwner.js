require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const organizationModel = require("../models/organization.model");
const { faker } = require("@faker-js/faker");

const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://waseem_db_user:wasi7Allah@cluster0.qvgcdm6.mongodb.net/test`;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("Connection error:", err);
        process.exit(1);
    }
}

async function seedOwners() {
    try {
        await connectDB();

        // 1. Fetch all 20 organizations
        const orgs = await organizationModel.find({});
        
        if (orgs.length === 0) {
            console.error("❌ No organizations found! Please run your organization seed script first.");
            process.exit(1);
        }

        console.log(`Found ${orgs.length} organizations. Generating one CEO for each...`);

        // 2. Pre-hash the password for speed
        const hashedPassword = await bcrypt.hash("123456", 12);
        const owners = [];

        // 3. Create 1 CEO per Organization
        for (const org of orgs) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email({ firstName, lastName }).toLowerCase();

            owners.push({
                name: `${firstName} ${lastName}`,
                email: email,
                password: hashedPassword, 
                organization: org._id, // Link to the specific Org
                ownerType: "organization",
                role: "ceo", // Specifically setting the role as CEO
                employeeEmail: email,
                about: `${firstName} is the visionary CEO of ${org.name}, specializing in ${org.industry || 'leadership'}.`,
                phone: faker.phone.number("03#########"),
                avatar: faker.image.avatar(),
                occupation: "CEO",
                isEmailVerified: true,
                isActive: true,
                lastLogin: new Date()
            });
        }

        // 4. Bulk Insert
        const res = await userModel.insertMany(owners);
        console.log(`✅ Success: Generated ${res.length} CEOs for ${orgs.length} organizations.`);

        // 5. Optional: Update the Organization's 'owner' field
        // If your Organization schema needs to point back to the User:
        for (const user of res) {
            await organizationModel.findByIdAndUpdate(user.organization, { owner: user._id });
        }
        console.log("✅ Organizations updated with their respective Owner IDs.");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding owners:", error);
        process.exit(1);
    }
}

seedOwners();