require("dotenv").config();
const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const redis_url = process.env.REDIS_URL || `redis://default:XTRdFdzioWTXlimAftjsPbWItJCDVfXl@redis.railway.internal:6379`
if (!redis_url) {
    throw new Error("REDIS_URL is required for BullMQ");
}
// Use REDIS_URL if available (Railway), otherwise fall back to individual host/port
const connection = new IORedis(redis_url,{
    maxRetriesPerRequest: null, // Critical for BullMQ compatibility
});

const aiQueue = new Queue('aiQueue', {connection})

module.exports = { aiQueue }
