
const { Queue } = require("bullmq");
const IORedis = require("ioredis");

// Use REDIS_URL if available (Railway), otherwise fall back to individual host/port
const connection = new IORedis(process.env.REDIS_URL || {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: null, // Critical for BullMQ compatibility
});

const aiQueue = new Queue('aiQueue', {connection})

module.exports = { aiQueue }
