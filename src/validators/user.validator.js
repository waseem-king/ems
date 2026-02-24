// here is the module to apply validators
const { body } = require("express-validator")
exports.createUserValidator = [
    body("home")
        .notEmpty().withMessage("Name is required")
        .isLength({ min:3 }),
    
    body("email")
        .isEmail().withMessage("Valid Email is required")
        .normalizeEmail(),
    
    body("password")
        .isLength({ min:6 }).withMessage("Password min 6 charactors"),
    
    body("phone")
        .optional()
        .isMobilePhone("any")
];
