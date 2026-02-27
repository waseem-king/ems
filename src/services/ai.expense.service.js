const { aiQueue } = require("../queues/aiQueue");
const { expenseRepository } = require("../repositories");


async function createExpense(data) {
    const createdExpense = expenseRepository.createExpense(data);

    // add ai categorization job only when category is missing
    if (!data.category) {
        await aiQueue.add('categorizeExpense', {
            expenseId: createExpense._id,
            title: createExpense.title,
            description: createExpense.description || "",
        },
            {
                attempts: 3,
                backoff: { type: 'exponential', delay: 5000 }
            }
        )
    }
    return createExpense;
}

export {createExpense};