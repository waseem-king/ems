const userServices = require("../services/user.services.js")
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
    getMe =asyncHandler(async(req, res)=>{
        const user = await userServices.getMe(req.oidc.user)
        res.json(user)
     
    })
    updateMe = asyncHandler( async (req, res)=>{
        const user =  await userServices.updateMe(req.oidc.user, req.body)
        res.json(user)
    })
    deleteMe = asyncHandler( async (req, res)=>{
        await userServices.deleteMe(req.oidc.user)
        res.json({message:"User Deleted Successfully"})
    })
}

module.exports = new UserController;