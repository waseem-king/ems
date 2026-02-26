// ==========================================================================
// Generate Token - JWT Token Generation Utility
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
require("dotenv").config();
const jwt = require("jsonwebtoken");

// ==========================================================================

/**
 * Generate JWT token with payload
 */
const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// ==========================================================================

module.exports = { generateToken };
