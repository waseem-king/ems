require("dotenv").config();
const mongoose = require("mongoose");
const organizationModel = require("../models/organization.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ems";

async function connectDB() {
    await mongoose.connect(MONGO_URI);
    console.log("Mongo db connected")
}

function generateSlug(name){
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, "")

}
async function updateORg() {
    try {
        await connectDB()
        const orgs = await organizationModel.find();
        console.log(`📦 Found ${orgs.length} organizations`);

        for( const org of orgs){
            const slug = generateSlug(org.name);
            org.slug = slug;
            await org.save()
            console.log(`✅ Updated: ${org.name} → slug: ${slug}`);
        }

     console.log("🎉 All organizations updated with slug!");
    process.exit();
    } catch (error) {
        console.error("❌ Error updating organizations:", err);
    process.exit(1);
    }
}

updateORg();
