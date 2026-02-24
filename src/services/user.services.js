const AppError = require("../middleware/appError");
const userRepository = require("../repositories/user.repository");
const { generateToken } = require("../utils/generateToken");


class UserServices {
    async createUser(data) {

        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError("User already exist", 400)
        }

        const user = await userRepository.create(data);
        const token = generateToken({ id: user._id });

        return { user, token }
    }

    async findExistingUser(id) {

        return await userRepository.findExistingUser(id)
    }

    async findByEmail(email) {

        return await userRepository.findByEmail(email)
    }

    async findAll() {

        return await userRepository.findAll()
    }

    async updateById(id, data) {

        return await userRepository.updateById(id, data)
    }

    async deleteById(id) {

        return await userRepository.deleteById(id)
    }

}

module.exports = new UserServices;

