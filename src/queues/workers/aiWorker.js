const { Worker, tryCatch } = require("bullmq");
const IORedis = require("ioredis");
const { expenseModel } = require("../../models");
const { categorizeExpense } = require("../../ai/aiClient");
const logger = require("../../config/logger");


const redis_url = process.env.REDIS_URL || `redis://default:XTRdFdzioWTXlimAftjsPbWItJCDVfXl@redis.railway.internal:6379`
if(!redis_url){
    throw new Error("Redis url is required for connecting with redis server")
}
// Use REDIS_URL if available (Railway), otherwise fall back to individual host/port
const connection = new IORedis(redis_url, {
  maxRetriesPerRequest: null, // Critical for BullMQ compatibility
});

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