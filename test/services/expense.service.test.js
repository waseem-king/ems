const AppError = require("../../src/middleware/appError");
const { expenseRepository } = require("../../src/repositories");
const expenseServices = require("../../src/services/expense.services")

jest.mock("../../src/repositories", () => ({
  expenseRepository: {
    getByIdAndOwner: jest.fn(),
    createExpense: jest.fn(),
    getAllByOwner: jest.fn(),
    updateByIdAndOwner: jest.fn(),
    deleteByIdAndOwner: jest.fn(),
    getExpenseDashboard: jest.fn(),
  },
}));

describe("ExpenseService - getExpenseById", ()=>{
    it("should return expense if found", async ()=>{
        const fakeExpense = { _id:"1", ownerId:"1", amount:100};

        expenseRepository.getByIdAndOwner.mockResolvedValue(fakeExpense);

        const result = await expenseServices.getByIdAndOwner("1","1")

        expect(result).toEqual(fakeExpense)
    });

    it("should throw error if expense not found", async ()=>{
        expenseRepository.getByIdAndOwner.mockResolvedValue(null)

        await expect(
            expenseServices.getByIdAndOwner("1", "1")
        ).rejects.toThrow("Expense not found")
    })
})
