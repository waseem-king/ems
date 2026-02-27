const { Worker, tryCatch } = require("bullmq");
const IORedis = require("ioredis");
const { expenseModel } = require("../../models");
const { categorizeExpense } = require("../../ai/aiClient");
const logger = require("../../config/logger");

const connection = new IORedis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
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