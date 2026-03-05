require("dotenv").config();
const { Queue } = require("bullmq");
const IORedis = require("ioredis");

// On Railway, process.env.REDIS_URL is automatically provided 
// once you add the Redis service to your project.
const redis_url = process.env.REDIS_URL
console.log("UUUUUUUUUUU = ", redis_url)



// 1. Create the connection instance
// We don't need 'async' here; ioredis connects automatically.
const connection = new IORedis(redis_url, {
    maxRetriesPerRequest: null, // Required by BullMQ
});

connection.on("error", (err) => console.error("Redis Connection Error:", err));
connection.on("connect", () => console.log("✅ Redis connected successfully"));

// 2. Pass the connection instance directly to the Queue
const aiQueue = new Queue('aiQueue', { connection });

module.exports = { aiQueue };