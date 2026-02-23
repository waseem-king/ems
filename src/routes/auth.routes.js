

const express = require("express");
const authController = require("../controllers/auth.controller");
const AppError = require("../middleware/appError");
const logger = require("../config/logger");
const router = express.Router()

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/profile", (req, res)=>{
    const user = req.oidc.user;
    if (!user) {
   return res.status(401).json({ message: "Not logged in" })
};
    res.json(req.oidc.user)})

module.exports = router;