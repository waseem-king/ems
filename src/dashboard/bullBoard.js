const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const { monthlyReportQueue } = require("../queues/monthlyReport.queue");
const { aiQueue } = require("../queues/aiQueue");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueue, replaceQueue } = createBullBoard({
    queues:[
        new BullMQAdapter(monthlyReportQueue),
        new BullMQAdapter(aiQueue)
    ],
    serverAdapter
})

module.exports = { serverAdapter };

