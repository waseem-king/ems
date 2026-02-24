const AppError = require("../middleware/appError");
const userRepository = require("../repositories/user.repository");


class UserServices{
    async createUser(data){
        const existingUser = await userRepository.create(data);
        if(existingUser){
            throw new AppError("User already exist", 400)
        }
        return userRepository.create(data);
    }
}
