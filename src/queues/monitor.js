const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const { aiQueue } = require("./aiQueue");

const serverAdapter = new ExpressAdapter();
createBullBoard({
    queues:[ new BullMQAdapter(aiQueue)],
    serverAdapter,
})

serverAdapter.setBasePath('/admin/queues')

module.exports = serverAdapter.getRouter();
