// Generate Token - JWT Token Generation Utility
require("dotenv").config();
const jwt = require("jsonwebtoken");

/**
 * Generate access token
 */
const generateAccessToken = (payload) =>{
    return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    )
}

// generate refresh token

const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN}
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};

