// this is the file to connect with database
require("dotenv").config();
const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI)
       console.log(`Mongo db connected ${conn.connection.host}`) 
    } catch (error) {
        console.error("Mongo db connection error")
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB;