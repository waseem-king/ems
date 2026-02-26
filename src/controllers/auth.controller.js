// ==========================================================================
// Auth Controller - Authentication Operations
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const AppError = require("../middleware/appError.js");
const userServices = require("../services/user.services.js");
const asyncHandler = require("../utils/asyncHandler");

// ==========================================================================

class UserController {

    // ----------------------------- Register User -----------------------------
    registerUser = asyncHandler(async (req, res) => {
        const user = await userServices.createUser(req.body);
        res
            .status(200)
            .json({ status: "success", data: user });
    });


    // ----------------------------- Login User -----------------------------
    loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError("Email or Password is missing", 400);
        }

        const user = await userServices.loginUser(email, password);
        res
            .status(200)
            .json({ status: "success", data: user });
    });


    // ----------------------------- Get Current User -----------------------------
    getMe = asyncHandler(async (req, res) => {
        const user = await userServices.getMe(req.oidc.user);
        res.json(user);
    });


    // ----------------------------- Update Current User -----------------------------
    updateMe = asyncHandler(async (req, res) => {
        const user = await userServices.updateMe(req.oidc.user, req.body);
        res.json(user);
    });


    // ----------------------------- Delete Current User -----------------------------
    deleteMe = asyncHandler(async (req, res) => {
        await userServices.deleteMe(req.oidc.user);
        res.json({ message: "User Deleted Successfully" });
    });
}

// ==========================================================================

module.exports = new UserController();
