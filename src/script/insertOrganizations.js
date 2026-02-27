require("dotenv").config();
const mongoose = require("mongoose");
// const organizationModel = require("../models/organization.model");
// const data = require("../data/organizations_dummy.json");
const users = require("../data/users_transformed.json")
const userModel = require("../models/user.model");



const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/ems`;

async function insertData(){
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB Connected")
        // clear the old data
        await userModel.deleteMany();
        console.log("Old users deleted successfully")
        // now insert new organizations
        const response = await userModel.insertMany(users);
        console.log(`🎉 ${response.length} users inserted`);
    } catch (error) {
        console.error(error || "Error in connecting or inserting")
        process.exit(1);
    }
}

insertData();