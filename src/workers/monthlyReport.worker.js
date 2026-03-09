require("dotenv").config();


const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const { expenseModel } = require("../models");
const { generateMonthlyReport } = require("../utils/pdfGenerator");
const { sendMonthlyReportEmail } = require("../services/email.service");


const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const monthlyReportWorker = new Worker(
  "monthlyReportQueue",
  async (job) => {
    const { userId, email, month } = job.data;

    const expenses = await expenseModel.find({ user: userId });

    const pdfPath = generateMonthlyReport(expenses, month);

    await sendMonthlyReportEmail(email, pdfPath, month);

    console.log(`Report sent to ${email}`);
  },
  { connection }
);

module.exports = { monthlyReportWorker };

