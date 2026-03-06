require("dotenv").config()
const { Worker, tryCatch } = require("bullmq");
const IORedis = require("ioredis");
const { expenseModel } = require("../../models");
const { categorizeExpense } = require("../../ai/aiClient");
const logger = require("../../config/logger");


// On Railway, process.env.REDIS_URL is automatically provided 
// once you add the Redis service to your project.
const redis_url = process.env.REDIS_URL

// 1. Create the connection instance
// We don't need 'async' here; ioredis connects automatically.
const connection = new IORedis(redis_url, {
    maxRetriesPerRequest: null, // Required by BullMQ
});

connection.on("error", (err) => console.error("Redis Connection Error:", err));
connection.on("connect", () => console.log("✅ Redis connected successfully"));

// worker to process ai categorization
const aiWorker = new Worker(
    'aiQueue',
    async (job)=>{
        const { expenseId, title, description } = job.data;

        try {
            const category = await categorizeExpense(title, description || "");
            await expenseModel.updateOne({ _id:expenseId }, { category });
            logger.write(`Expense ${expenseId} categorized as ${category}`)
        } catch (error) {
            logger.error(`Failed to categorize expense ${expenseId}:`, error);
            throw error;
        }
    },
    {
        connection, concurrency:5
    }
)

// Event listeners (optional)

aiWorker.on("completed", (job)=>{
    logger.write(`Job ${job.id} completed`)
})

aiWorker.on("failed", (job, err)=>{
    logger.error(`Job ${job.id} failed:`, err.message)
})

