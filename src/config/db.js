require("dotenv").config();
require('dns').setDefaultResultOrder('ipv4first');
const mongoose = require("mongoose");
const logger = require("./logger");

/**
 * Connect to MongoDB database with Node 24 optimizations
 */
const connectDB = async () => {
    try {
        logger.info('Attempting MongoDB connection...');
        logger.info(`MONGO_URI length: ${process.env.MONGO_URI ? process.env.MONGO_URI.length : 'undefined'}`);
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        logger.info(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`MongoDB error: ${error.message}`);
        logger.error(error.stack);
        process.exit(1);
    }
};

module.exports = connectDB;
