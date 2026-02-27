// ==========================================================================
// User Controller - CRUD Operations for Users
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const AppError = require("../middleware/appError");
const { userServices } = require("../services");
const asyncHandler = require("../utils/asyncHandler");

// ==========================================================================

class UserController {
    
    // ----------------------------- Create User -----------------------------
    createUser = asyncHandler(async (req, res) => {
        const data = req.body;
        const { user, token } = await userServices.createUser(data);

        if (!user) {
            throw new AppError("User could not be created", 400);
        }

        res.json({ status: "success", data: user, token: token });
    });


    // ----------------------------- User Login -----------------------------
    loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError("Email or password not provided", 400);
        }

        const user = await userServices.loginUser(req.body.email, req.body.password);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: user});
    });


    // ----------------------------- Get User by ID -----------------------------
    findExistingUser = asyncHandler(async (req, res) => {
        const user = await userServices.findExistingUser(req.params.id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: user });
    });


    // ----------------------------- Get All Users -----------------------------
    findAll = asyncHandler(async (req, res) => {
        const user = await userServices.findAll();

        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: user });
    });


    // ----------------------------- Get User by Email -----------------------------
    findByEmail = asyncHandler(async (req, res) => {
        const email = req.query;

        if (email) {
            const user = await userServices.findByEmail(email);

            if (!user) {
                throw new AppError("User not found", 404);
            }

            return res.json({ status: "success", data: user });
        } else {
            throw new AppError("Email not provided", 400);
        }
    });


    // ----------------------------- Update User by ID -----------------------------
    updateById = asyncHandler(async (req, res) => {
        const user = await userServices.findExistingUser(req.params.id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const newUser = await userServices.updateById(req.params.id, req.body);

        if (!newUser) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: newUser });
    });


    // ----------------------------- Delete User by ID -----------------------------
    deleteById = asyncHandler(async (req, res) => {
        const user = await userServices.findExistingUser(req.params.id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const message = await userServices.deleteById(req.params.id);

        if (!message) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: message });
    });
}

// ==========================================================================

module.exports = new UserController();
