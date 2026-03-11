const AppError = require("../../src/middleware/appError");
const jest = require("jest");

// Mock the repository - must be a class constructor that returns an instance
jest.mock("../../src/repositories", () => {
    const mockInstance = {
        getByIdAndOwner: jest.fn(),
        createExpense: jest.fn(),
        getAllByOwner: jest.fn(),
        updateByIdAndOwner: jest.fn(),
        deleteByIdAndOwner: jest.fn(),
        getExpenseDashboard: jest.fn(),
    };
    
    return {
        expenseRepository: jest.fn().mockImplementation(() => mockInstance),
        __esModule: true,
    };
});

// Also mock the aiClient to avoid external dependencies
jest.mock("../../src/ai/aiClient", () => ({
    categorizeExpense: jest.fn().mockResolvedValue("general")
}));

// Import after mock is set up
const { expenseRepository } = require("../../src/repositories");
const ExpenseServices = require("../../src/services/expense.services");

// Create instance of the service
const expenseServices = new ExpenseServices();

describe("ExpenseService - getExpenseById", () => {
    let mockExpenseRepositoryInstance;

    beforeEach(() => {
        mockExpenseRepositoryInstance = expenseRepository();
        jest.clearAllMocks();
    });

    it("should return expense if found", async () => {
        const fakeExpense = { _id: "1", ownerId: "1", amount: 100 };
        mockExpenseRepositoryInstance.getByIdAndOwner.mockResolvedValue(fakeExpense);

        const result = await expenseServices.getByIdAndOwner("1", "1");

        expect(result).toEqual(fakeExpense);
    });

    it("should throw error if expense not found", async () => {
        mockExpenseRepositoryInstance.getByIdAndOwner.mockResolvedValue(null);

        await expect(
            expenseServices.getByIdAndOwner("1", "1")
        ).rejects.toThrow("Expense not found");
    });
});

