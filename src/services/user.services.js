// ==========================================================================
// User Services - Business Logic for Users
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const AppError = require("../middleware/appError");
const { UserRepository , UserAnalytics }= require("../repositories/user.repository");
const { generateToken } = require("../utils/generateToken");

// ==========================================================================

class UserServices {
    /**
     * Create a new user
     */
    async createUser(data) {
        const existingUser = await UserRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError("User already exist", 400);
        }

        const user = await UserRepository.create(data);
        const token = generateToken({ id: user._id });

        return { user, token };
    }

    /**
     * Login user with email and password
     */
    async loginUser(email, password) {
        const user = await UserRepository.findByEmail(email);

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
        return await UserRepository.findExistingUser(id);
    }

    /**
     * Find user by email
     */
    async findByEmail(email) {
        return await UserRepository.findByEmail(email);
    }

    /**
     * Find all users
     */
    async findAll() {
        return await UserRepository.findAll();
    }

    /**
     * Update user by ID
     */
    async updateById(id, data) {
        return await UserRepository.updateById(id, data);
    }

    /**
     * Delete user by ID
     */
    async deleteById(id) {
        return await UserRepository.deleteById(id);
    }
}

// ==========================================================================
                    //Users aggregations services
// ==========================================================================

class UserAnalyticsServices{
    async showtUserDashboard(userId, month, year){
        const response = await UserAnalytics.getUserDashboard(userId, month, year)
        return response;
    }
}

module.exports = {
    UserServices: new UserServices(),
    UserAnalyticsServices: new UserAnalyticsServices()
}
