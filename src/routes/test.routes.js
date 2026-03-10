const express = require("express");
const router = express.Router();
const { aiQueue } = require("../queues/aiQueue");
const { monthlyReportQueue } = require("../queues/monthlyReport.queue");

// Test endpoint to add AI categorization job
router.post("/test-ai-job", async (req, res) => {
    try {
        const job = await aiQueue.add('categorizeExpense', {
            expenseId: 'test-expense-' + Date.now(),
            title: 'Test Expense',
            description: 'This is a test expense for demo purposes',
        }, {
            attempts: 3,
            backoff: { type: 'exponential', delay: 5000 }
        });

        res.json({
            success: true,
            message: 'AI job added to queue',
            jobId: job.id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add AI job',
            error: error.message
        });
    }
});

// Test endpoint to add monthly report job
router.post("/test-monthly-report-job", async (req, res) => {
    try {
        const { email, month } = req.body;
        
        const job = await monthlyReportQueue.add('sendReport', {
            userId: 'test-user-' + Date.now(),
            email: email || 'test@example.com',
            month: month || new Date().toLocaleString("default", { month: "long" })
        });

        res.json({
            success: true,
            message: 'Monthly report job added to queue',
            jobId: job.id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add monthly report job',
            error: error.message
        });
    }
});

// Test endpoint to add multiple jobs at once
router.post("/test-bulk-jobs", async (req, res) => {
    try {
        const { count = 5 } = req.body;
        
        const aiJobs = [];
        for (let i = 0; i < count; i++) {
            aiJobs.push({
                name: 'categorizeExpense',
                data: {
                    expenseId: 'test-expense-' + Date.now() + '-' + i,
                    title: 'Test Expense ' + i,
                    description: 'Bulk test expense',
                },
                opts: {
                    attempts: 3,
                    backoff: { type: 'exponential', delay: 5000 }
                }
            });
        }

        await aiQueue.addBulk(aiJobs);

        res.json({
            success: true,
            message: `Added ${count} AI jobs to queue`,
            count: count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add bulk jobs',
            error: error.message
        });
    }
});

module.exports = router;
