const jwt = require("jsonwebtoken");

// Mock the user.repository module - need to handle both static and instance calls
jest.mock("../../src/repositories/user.repository", () => {
    // Create a mock function for findExistingUser
    const mockFindExistingUser = jest.fn().mockResolvedValue({ id: "user123", role: "admin" });
    
    // Create a mock class that can be called as both a constructor (new) and statically
    const MockUserRepository = jest.fn().mockImplementation(() => ({
        // Instance method
        findExistingUser: mockFindExistingUser
    }));
    
    // Also assign as static method
    MockUserRepository.findExistingUser = mockFindExistingUser;
    
    return {
        __esModule: true,
        default: MockUserRepository,
        UserRepository: MockUserRepository
    };
});

// Mock jsonwebtoken
jest.mock("jsonwebtoken");

// Import after mocks are set up
const { protect, authorize } = require("../../src/middleware/auth.middleware");

describe("Auth Middleware - protect", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: { authorization: "Bearer fakeToken" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should call next if token is valid", async () => {
    jwt.verify.mockReturnValue({ id: "user123" });

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

