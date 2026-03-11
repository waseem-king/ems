const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const monthlyReportQueue = new Queue("monthlyReportQueue", {
  connection,
});

module.exports = { monthlyReportQueue };
