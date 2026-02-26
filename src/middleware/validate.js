// ==========================================================================
// Validate Middleware - Express Validator Middleware
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const { validationResult } = require("express-validator");
const AppError = require("./appError");

// ==========================================================================

/**
 * Middleware to handle validation errors
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map(err => err.msg)
      .join(" , ")
    return next(new AppError(message, 400))
  }
  next();
};
