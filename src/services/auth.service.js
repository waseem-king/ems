const AppError = require("../middleware/appError");
const userRepo = require("../repositories/user.repository");
const { generateToken } = require("../utils/generateToken");

const registerUser = async (data) =>{
    // check if user already exist
    const alreadyExist = await userRepo.findByEmail(data.email);
    if(alreadyExist){
        throw new AppError("User Already exist", 400)
    }
    // now if this is new user then store user in database and return user and toeken
    const user = await userRepo.create(data);
    // now generate token and send it back to user
    const token = generateToken({id:user._id})

    return { user, token}
}

// here is the function to generate token
const loginUser = async(email, password)=>{
    // find the user using email
    const user = await userRepo.findByEmail(email);
    // if user not found throw the error
    if(!user){
        throw new AppError("User not Found", 404)
    }
    // if user found now check the password
    const isMatch = await user.comparePassword(password);
    // if password not match return
    if(!isMatch){
        throw new AppError("Passoword not match", 400)
    }
    // now if password is matched so set user last login date
    user.lastLogin = Date.now();
    // save the user 
    await user.save()
    // generate the token and return with the user
    const token = generateToken({id:user._id})
    return { user, token}
}

module.exports = { registerUser, loginUser}