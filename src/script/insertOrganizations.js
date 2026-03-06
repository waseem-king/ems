require("dotenv").config();
const mongoose = require("mongoose");
const organizationModel = require("../models/organization.model");
const userModel = require("../models/user.model");
const { faker } = require("@faker-js/faker");
const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://waseem_db_user:wasi7Allah@cluster0.qvgcdm6.mongodb.net/test`;


// connect with database
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Connection error:", err);
        process.exit(1);
    }
}

const generateOrganizations = (ownerId, count = 50) => {
    const orgs = [];
    const types = ["business", "school", "hospital", "ngo"];

    for (let i = 0; i < count; i++) {
        const companyName = faker.company.name();
        orgs.push({
            name: companyName,
            slug: faker.helpers.slugify(companyName).toLowerCase(),
            type: faker.helpers.arrayElement(types),
            industry: faker.company.buzzNoun(), // e.g., "solutions", "logistics"
            logo: faker.image.urlLoremFlickr({ category: 'business' }),
            owner: ownerId, // Linking to the user we created
            defaultCurrency: "PKR",
            isActive: true
        });
    }
    return orgs;
};

async function seed() {
    try {
        await connectDB();
        // 1. We need a User to own these organizations

        // 2. generate dummy orgamization
        const count = 20; // Adjust how many you want
        const ownerId = "69a7046aa0fa45db7c42fb8f";
        const fakeOrgs = generateOrganizations( ownerId ,count);

        //3. insert these organization in database
        const res = await organizationModel.insertMany(fakeOrgs)
        console.log(`✅ Success: ${res.length} Organizations inserted in DB.`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seed()

