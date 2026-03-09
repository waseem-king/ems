const express  = require("express");
const { addMonthlyReportJob } = require("../../src/jobs/monthlyReport.job");
const router = express.Router();

router.get("/test-email", async (req, res)=>{
    try {
        await addMonthlyReportJob(
             "testUserId",
            "yourgmail@gmail.com",
            "March"
        )
         res.json({ message: "Email job added to queue" });
    } catch (error) {
         res.json({ message: "Email job added to queue" });
    }
})

module.exports = router;

