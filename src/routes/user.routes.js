// this is the route to store users
const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();
const userController = require("../controllers/auth.controller")


router.post("/users", userController.registerUser)

router.get("/users", protect, userController.loginUser);
// router.get("/users/:id");

// router.put("/users/:id");

// router.delete("/users/:id");

module.exports = router;
