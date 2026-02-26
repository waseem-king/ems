// ==========================================================================
// Expense Services - Business Logic for Expenses
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const AppError = require("../middleware/appError");
const { expenseRepository } = require("../repositories");
const { categorizeExpense } = require("../ai/aiClient");

// ==========================================================================

class ExpenseServices {
    /**
     * Calculate how much each participant owes based on split type
     * @param {Number} totalAmount
     * @param {Array} participants - array of participant objects
     * @param {String} splitType - "equal" | "percentage" | "custom"
     * @returns participants array with amountOwed calculated
     */
    calculateOwedAmount(totalAmount, participants, splitType) {
        if (!participants || participants.length === 0) {
            throw new AppError("Participants data is required", 400);
        }

        switch (splitType) {
            case "equal":
                const perPerson = totalAmount / participants.length;
                return participants.map((p) => ({ ...p, amountOwed: perPerson }));

            case "percentage":
                return participants.map((p) => {
                    if (p.percentage === undefined) {
                        throw new AppError(
                            `The percentage of the person ${p.name} is not provided`,
                            404
                        );
                    }
                    return { ...p, amountOwed: (p.percentage * totalAmount) / 100 };
                });

            case "custom":
                participants.forEach((p) => {
                    if (p.amountOwed === undefined) {
                        throw new AppError(
                            `Custom amountOwed missing for participant ${p.name || p.id}`,
                            400
                        );
                    }
                });
                return participants;

            default:
                throw new AppError(
                    "Invalid split type. Must be 'equal', 'percentage', or 'custom'",
                    400
                );
        }
    }

    /**
     * Categorize expense using AI if no category provided
     * @param {Object} data - expense data
     * @returns {Object} - data with category set
     */
    async categorizeExpenseIfNeeded(data) {
        if (!data.category && data.title) {
            try {
                const category = await categorizeExpense(data.title, data.description || '');
                return { ...data, category };
            } catch (error) {
                console.error('AI categorization failed, using default category:', error.message);
                return { ...data, category: 'other' };
            }
        }
        return data;
    }

    /**
     * Create a new expense with participants split calculated
     * @param {Object} data - expense data
     */
    async createExpense(data) {
        const { totalAmount, participants, splitType } = data;

        if (!totalAmount || totalAmount <= 0) {
            throw new AppError("Total amount must be greater than 0", 400);
        }

        // Categorize expense using AI if no category provided
        const dataWithCategory = await this.categorizeExpenseIfNeeded(data);

        // Calculate owed amounts
        const participantsWithOwed = this.calculateOwedAmount(
            totalAmount,
            participants,
            splitType
        );

        // Save to DB
        return await expenseRepository.createExpense({
            ...dataWithCategory,
            participants: participantsWithOwed,
        });
    }

    /**
     * Get all expenses by owner
     */
    async getAllByOwner(ownerType, ownerId) {
        return expenseRepository.getAllByOwner(ownerType, ownerId);
    }

    /**
     * Get single expense by ID and owner
     */
    async getByIdAndOwner(id, ownerId) {
        const exp = await expenseRepository.getByIdAndOwner(id, ownerId);
        if (!exp) throw new AppError("Expense not found", 404);
        return exp;
    }

    /**
     * Update expense by ID and owner
     */
    async updateByIdAndOwner(id, ownerId, data) {
        // If participants or totalAmount is updated, recalc amountOwed
        if (data.totalAmount || data.participants || data.splitType) {
            const participantsWithOwed = this.calculateOwedAmount(
                data.totalAmount,
                data.participants,
                data.splitType
            );
            data.participants = participantsWithOwed;
        }

        const exp = await expenseRepository.updateByIdAndOwner(id, ownerId, data);
        if (!exp) throw new AppError("Expense not found", 404);
        return exp;
    }

    /**
     * Delete expense by ID and owner
     */
    async deleteByIdAndOwner(id, ownerId) {
        const exp = await expenseRepository.deleteByIdAndOwner(id, ownerId);
        if (!exp) throw new AppError("Expense not found", 404);
        return exp;
    }

    /**
     * Generate report of how much each participant owes
     * @param {Object} expense
     * @returns array of { name, amountOwed, paid, remaining }
     */
    generateExpenseReport(expense) {
        return expense.participants.map(p => ({
            name: p.name || p.id,
            amountOwed: p.amountOwed,
            paid: p.paid || 0,
            remaining: p.amountOwed - (p.paid || 0)
        }));
    }
}

// ==========================================================================

module.exports = new ExpenseServices;
