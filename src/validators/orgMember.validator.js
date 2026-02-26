// ==========================================================================
// Organization Member Validator - Validation Rules
// ==========================================================================

const { body, param } = require("express-validator");

// ==========================================================================

// Validator for creating/updating organization member
exports.createOrUpdateOrgMemberValidator = [
  body("user")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("User must be a valid Mongo ID"),

  body("organization")
    .notEmpty()
    .withMessage("Organization ID is required")
    .isMongoId()
    .withMessage("Organization must be a valid Mongo ID"),

  body("role")
    .optional()
    .isIn(["ceo", "hr", "team_lead", "senior", "junior"])
    .withMessage("Role must be one of: ceo, hr, team_lead, senior, junior"),

  body("employeeEmail")
    .optional()
    .isEmail()
    .withMessage("Employee email must be a valid email address")
    .normalizeEmail(),

  body("about")
    .optional()
    .isString()
    .withMessage("About must be a string"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),

  body("joinedAt")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("joinedAt must be a valid date"),
];

// Validate `id` param for update/delete/fetch
exports.orgMemberIdParamValidator = [
  param("id")
    .notEmpty()
    .withMessage("Organization Member ID is required")
    .isMongoId()
    .withMessage("Invalid Organization Member ID format"),
];
