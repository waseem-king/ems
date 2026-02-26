// ==========================================================================
// Auth Middleware - Authentication and Authorization
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

// ==========================================================================

/**
 * Middleware to protect routes - verifies JWT token
 */
const protect = async (req, res, next) => {
    try {
        let token;

        // 1️⃣ Check token exists
        if (!req.headers.authorization?.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. No token",
            });
        }

        // 2️⃣ Extract token
        token = req.headers.authorization.split(" ")[1];

        // 3️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4️⃣ Get user from DB
        const user = await userRepository.findExistingUser(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists",
            });
        }

        // 5️⃣ Attach user to request
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token invalid or expired",
        });
    }
};

/**
 * Middleware to authorize roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: insufficient permissions",
            });
        }

        next();
    };
};

// ==========================================================================

module.exports = { protect, authorize };
