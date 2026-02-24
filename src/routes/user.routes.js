// this is the route to store users
const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { userController } = require("../controllers");
const validate = require("../middleware/validate");
const {createUserValidator} = require("../validators/user.validator");
const router = express.Router();

router.post("/users", createUserValidator, validate, userController.createUser);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findExistingUser);
router.get("/users/email/:email", userController.findByEmail);
router.put("/users/:id", userController.updateById);
router.delete("/users/:id", userController.deleteById);

module.exports = router;
