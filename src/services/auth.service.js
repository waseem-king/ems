// ==========================================================================
// Auth Service - Authentication Business Logic
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const AppError = require("../middleware/appError");
const userRepo = require("../repositories/user.repository");
const { generateToken } = require("../utils/generateToken");

// ==========================================================================

class AuthServices {
    /**
     * Register a new user
     */
    registerUser = async (data) => {
        // Check if user already exists
        const alreadyExist = await userRepo.findByEmail(data.email);
        if (alreadyExist) {
            throw new AppError("User Already exist", 400);
        }

        // Create new user in database
        const user = await userRepo.create(data);

        // Generate token
        const token = generateToken({ id: user._id });

        return { user, token };
    };

    /**
     * Login user with email and password
     */
    loginUser = async (email, password) => {
        // Find user by email
        const user = await userRepo.findByEmail(email);

        // If user not found
        if (!user) {
            throw new AppError("User not Found", 404);
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new AppError("Password not match", 400);
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        // Generate token
        const token = generateToken({ id: user._id });

        return { user, token };
    };

    /**
     * Get current user from Auth0
     */
    getMe = async (auth0User) => {
        return userRepo.findByAuth0Id(auth0User.sub);
    };

    /**
     * Update current user
     */
    updateMe = async (auth0User, data) => {
        return userRepo.updateByAuth0Id(auth0User.sub, data);
    };

    /**
     * Delete current user
     */
    deleteMe = async (auth0User) => {
        return userRepo.deleteByAuth0Id(auth0User.sub);
    };
}

// ==========================================================================

module.exports = new AuthServices;
