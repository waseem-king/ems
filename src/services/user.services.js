// User Services - Business Logic for Users

const AppError = require("../middleware/appError");
const { UserRepository } = require("../repositories");
const newUserRepository = new UserRepository();

class UserServices {
  /**
   * Create a new user
   */
  async createUser(data) {
    const existingUser = await newUserRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("User already exist", 400);
    }
    const user = await newUserRepository.create(data);
    return { user };
  }

  /**
   * Login user with email and password
   */
  async loginUser(email, password) {
    const user = await newUserRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }
    return user;
  }

  /**
   * Find existing user by ID
   */
  async findExistingUser(id) {
    return await newUserRepository.findExistingUser(id);
  }

  /**
   * Find user by email
   */
  async findByEmail(email) {
    return await newUserRepository.findByEmail(email);
  }

  /**
   * Find all users
   */
  async findAll() {
    return await newUserRepository.findAll();
  }

  /**
   * Update user by ID
   */
  async updateById(id, data) {
    return await newUserRepository.updateById(id, data);
  }

  /**
   * Delete user by ID
   */
  async deleteById(id) {
    return await newUserRepository.deleteById(id);
  }
  //Users aggregations services
  async showtUserDashboard(userId, month, year) {
    const response = await UserAnalytics.getUserDashboard(userId, month, year);
    return response;
  }
}

module.exports = UserServices;
