const cron = require("node-cron");
const { addMonthlyReportJob } = require("../jobs/monthlyReport.job");
const { userModel } = require("../models");

cron.schedule("0 0 1 * *", async () => {
  console.log("Running monthly report job");

  const users = await userModel.find();

  const month = new Date().toLocaleString("default", { month: "long" });

  for (const user of users) {
    await addMonthlyReportJob(user._id, user.email, month);
  }
});

