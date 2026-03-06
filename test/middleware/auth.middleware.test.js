const { protect, authorize } = require("../../src/middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const { UserRepository } = require("../../src/repositories/user.repository");

jest.mock("jsonwebtoken");
jest.mock("../../src/repositories/user.repository");

describe("Auth Middleware - protect", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: { authorization: "Bearer fakeToken" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("should call next if token is valid", async () => {
    jwt.verify.mockReturnValue({ id: "user123" });
    UserRepository.findExistingUser.mockResolvedValue({ id: "user123", role: "admin" });

    await protect(req, res, next);

    expect(req.user).toBeDefined();
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if token missing", async () => {
    req.headers.authorization = undefined;
    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Not authorized. No token",
    });
  });
});

