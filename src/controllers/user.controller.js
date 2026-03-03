// ==========================================================================
// User Controller - CRUD Operations for Users
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const mongoose = require("mongoose")
const logger = require("../config/logger");
const AppError = require("../middleware/appError");
const { UserServices, UserAnalyticsServices } = require("../services");
const asyncHandler = require("../utils/asyncHandler");

// ==========================================================================

class UserController {
    
    // ----------------------------- Create User -----------------------------
    createUser = asyncHandler(async (req, res) => {
        const data = req.body;
        const { user, token } = await UserServices.createUser(data);

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

        const user = await UserServices.loginUser(req.body.email, req.body.password);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: user});
    });


    // ----------------------------- Get User by ID -----------------------------
    findExistingUser = asyncHandler(async (req, res) => {
        const user = await UserServices.findExistingUser(req.params.id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: user });
    });


    // ----------------------------- Get All Users -----------------------------
    findAll = asyncHandler(async (req, res) => {
        const user = await UserServices.findAll();

        if (!user) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: user });
    });


    // ----------------------------- Get User by Email -----------------------------
    findByEmail = asyncHandler(async (req, res) => {
        const email = req.query;

        if (email) {
            const user = await UserServices.findByEmail(email);

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
        const user = await UserServices.findExistingUser(req.params.id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const newUser = await UserServices.updateById(req.params.id, req.body);

        if (!newUser) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: newUser });
    });


    // ----------------------------- Delete User by ID -----------------------------
    deleteById = asyncHandler(async (req, res) => {
        const user = await UserServices.findExistingUser(req.params.id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const message = await UserServices.deleteById(req.params.id);

        if (!message) {
            throw new AppError("User not found", 404);
        }

        res.json({ status: "success", data: message });
    });
}

// ==========================================================================
                    // User Aggregations controller class
// ==========================================================================

class UserAnalyticsController{
    myDashboard = asyncHandler( async (req, res)=>{
        const userId = new mongoose.Types.ObjectId(req.user.id)
        const { month, year } = req.body;
        const response = await UserAnalyticsServices.showtUserDashboard(userId, month, year)
        res.status(200).json({ status:"success", data:response})
    })
}

module.exports = {
    userController: new UserController(),
    UserAnalyticsController: new UserAnalyticsController()
}
