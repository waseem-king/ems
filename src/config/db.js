// this is the file to connect with database
require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async ()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI)
       logger.info(`Mongo db connected host is ${conn.connection.host}`)
    } catch (error) {
        logger.error(`"Mongo db connection error" ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;
