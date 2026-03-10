const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

// Import all queues
const { aiQueue } = require("./aiQueue");
const { monthlyReportQueue } = require("./monthlyReport.queue");

// Create Express adapter for Bull Board
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

// Create Bull Board with all queues
createBullBoard({
    queues: [
        new BullMQAdapter(aiQueue),
        new BullMQAdapter(monthlyReportQueue)
    ],
    serverAdapter
});

module.exports = serverAdapter.getRouter();

