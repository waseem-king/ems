// ==========================================================================
// User Services - Business Logic for Users
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const AppError = require("../middleware/appError");
const userRepository = require("../repositories/user.repository");
const { generateToken } = require("../utils/generateToken");

// ==========================================================================

class UserServices {
    /**
     * Create a new user
     */
    async createUser(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError("User already exist", 400);
        }

        const user = await userRepository.create(data);
        const token = generateToken({ id: user._id });

        return { user, token };
    }

    /**
     * Login user with email and password
     */
    async loginUser(email, password) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }

        const token = generateToken({ id: user._id });

        return { user, token };
    }

    /**
     * Find existing user by ID
     */
    async findExistingUser(id) {
        return await userRepository.findExistingUser(id);
    }

    /**
     * Find user by email
     */
    async findByEmail(email) {
        return await userRepository.findByEmail(email);
    }

    /**
     * Find all users
     */
    async findAll() {
        return await userRepository.findAll();
    }

    /**
     * Update user by ID
     */
    async updateById(id, data) {
        return await userRepository.updateById(id, data);
    }

    /**
     * Delete user by ID
     */
    async deleteById(id) {
        return await userRepository.deleteById(id);
    }
}

// ==========================================================================

module.exports = new UserServices();
