// ==========================================================================

// ==========================================================================
// Organization Validator - Validation Rules for Organization Operations
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const { body, param } = require("express-validator");

// ==========================================================================

// Create / Update Organization Validator
exports.createOrUpdateOrganizationValidator = [
  body("name")
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ min: 2 })
    .withMessage("Organization name must be at least 2 characters"),

  body("type")
    .notEmpty()
    .withMessage("Organization type is required")
    .isIn(["business", "school", "hospital", "ngo"])
    .withMessage("Organization type must be one of: business, school, hospital, ngo"),

  body("industry")
    .optional()
    .isString()
    .withMessage("Industry must be a string"),

  body("logo")
    .optional()
    .isString()
    .withMessage("Logo must be a valid string (URL or file path)"),

  body("owner")
    .notEmpty()
    .withMessage("Owner is required")
    .isMongoId()
    .withMessage("Owner must be a valid Mongo ID"),

  body("defaultCurrency")
    .optional()
    .isString()
    .isLength({ min: 3, max: 3 })
    .withMessage("defaultCurrency must be a 3-letter currency code, e.g. USD, PKR"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
];

// Validate `id` param for fetch/update/delete
exports.organizationIdParamValidator = [
  param("id")
    .notEmpty()
    .withMessage("Organization ID is required")
    .isMongoId()
    .withMessage("Invalid Organization ID format"),
];
