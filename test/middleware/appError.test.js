const AppError = require("../../src/middleware/appError");

describe("AppError Class", ()=>{
    it("should create error with message and status code", ()=>{
        const error = new AppError("Test error", 400);

        expect(error.message).toBe("Test error");
        expect(error.statusCode).toBe(400);
        expect(error.status).toBe("Fail");
        expect(error.isOperational).toBe(true);
        expect(error.stack).toBeDefined();
    });

    it("should set status as error for 5xx codes",()=>{
        const error = new AppError("Server error", 500);

        expect(error.message).toBe("Server error")
        expect(error.statusCode).toBe(500)
    })
})

