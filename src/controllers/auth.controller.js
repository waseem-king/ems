// Auth Controller - Authentication Operations
const AppError = require("../middleware/appError.js");
const UserServices = require("../services/user.services.js");
const newUserServices = new UserServices();
const asyncHandler = require("../utils/asyncHandler");

class UserController {

    // ----------------------------- Register User -----------------------------
    registerUser = asyncHandler(async (req, res) => {
        const user = await newUserServices.createUser(req.body);
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

        const user = await newUserServices.loginUser(email, password)
        res
            .status(200)
            .json({ status: "success", data: user });
    });


    // ----------------------------- Get Current User -----------------------------
    getMe = asyncHandler(async (req, res) => {
        const user = await newUserServices.getMe(req.oidc.user);
        res.json(user);
    });


    // ----------------------------- Update Current User -----------------------------
    updateMe = asyncHandler(async (req, res) => {
        const user = await newUserServices.updateMe(req.oidc.user, req.body);
        res.json(user);
    });


    // ----------------------------- Delete Current User -----------------------------
    deleteMe = asyncHandler(async (req, res) => {
        await newUserServices.deleteMe(req.oidc.user);
        res.json({ message: "User Deleted Successfully" });
    });
}

module.exports = UserController;

