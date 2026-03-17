// User Controller - CRUD Operations for Users
// ----------------------------- Dependencies -----------------------------
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const logger = require("../config/logger");
const AppError = require("../middleware/appError");
const { UserServices } = require("../services");
const asyncHandler = require("../utils/asyncHandler");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");


class UserController {
  // ----------------------------- Create User -----------------------------
  createUser = asyncHandler(async (req, res) => {
    const data = req.body;
    const newUserServices = new UserServices();
    const { user, token } = await newUserServices.createUser(data);
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
    const newUserServices = new UserServices();
    const user = await newUserServices.loginUser(
      req.body.email,
      req.body.password,
    );
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const payload = {
      id: user._id
    }
    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    // 1. Set the cookie first
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ status: "success", data: user, accessToken });
  });

  // create refresh token api
  refreshToken = asyncHandler( async(req, res)=>{
    const token = req.cookie.refreshToken;
    if(!token){
      return res.status(401).json({ message: "No refresh token" });
    }
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded)=>{
      if(err){
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      const newAccessToken = generateAccessToken({
        id:decoded.id
      })
      res.json({ accessToken: newAccessToken})
    })
  })

  // ----------------------------- Get User by ID -----------------------------
  findExistingUser = asyncHandler(async (req, res) => {
    const newUserServices = new UserServices();
    console.log("Profle === ", req.user)
    const user = await newUserServices.findExistingUser(req.user?.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    console.log("Find existing user", user)
    res.json({ status: "success", data: user });
  });

  // ----------------------------- Get All Users -----------------------------
  findAll = asyncHandler(async (req, res) => {
    const newUserServices = new UserServices();
    const user = await newUserServices.findAll();
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.json({ status: "success", data: user });
  });

  // ----------------------------- Get User by Email -----------------------------
  findByEmail = asyncHandler(async (req, res) => {
    const email = req.query;
    const newUserServices = new UserServices();
    if (email) {
      const user = await newUserServices.findByEmail(email);
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
    const newUserServices = new UserServices();
    const user = await newUserServices.findExistingUser(req.user.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const newUser = await newUserServices.updateById(req.user.id, req.body);
    if (!newUser) {
      throw new AppError("User not found", 404);
    }
    res.json({ status: "success", data: newUser });
  });

  // ----------------------------- Delete User by ID -----------------------------
  deleteById = asyncHandler(async (req, res) => {
    const newUserServices = new UserServices();
    const user = await newUserServices.findExistingUser(req.params.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const message = await newUserServices.deleteById(req.params.id);
    if (!message) {
      throw new AppError("User not found", 404);
    }
    res.json({ status: "success", data: message });
  });

  // User Aggregations controller class
  myDashboard = asyncHandler(async (req, res) => {
    const newUserServices = new UserServices();
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { month, year } = req.body;
    const numMonth = Number(month);
    const numYear = Number(year);
    const response = await newUserServices.showtUserDashboard(
      userId,
      numMonth,
      numYear,
    );
    res.status(200).json({ status: "success", data: response });
  });
}

module.exports = UserController;
