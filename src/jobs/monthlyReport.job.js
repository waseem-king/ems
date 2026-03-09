const { monthlyReportQueue } = require("../queues/monthlyReport.queue");

const addMonthlyReportJob = async (userId, email, month)=>{
    await monthlyReportQueue.add("sendReport",{
        userId,
        email,
        month
    })
};

module.exports = {addMonthlyReportJob};