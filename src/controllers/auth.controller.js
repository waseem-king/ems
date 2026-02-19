const { registerUser, loginUser } = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");

class UserController{
    registerUser = async (req, res)=>{
        const user = await registerUser(req.body);
        res
           .status(200)
           .json({status:"success", data:user})
    }
    loginUser = async (req, res)=>{
        const {email, password} = req.body
        const user = await loginUser(email, password);
         res
           .status(200)
           .json({status:"success", data:user})
    }
}

module.exports = new UserController;