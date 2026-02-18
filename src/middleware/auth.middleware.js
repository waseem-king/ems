const jwt = require("jsonwebtoken")
const User = require("../models/user.model");
const AppError = require("./appError");

const protect = async(req, res, next)=>{
    try {
        let token;
        if(
            req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")
        ){
            token = req.headers.authorization.split(" ")[1];
            if(!token){
                return res
                          .status(400)
                          .json({success:"false", data:"Not Authorized"})
            }
            // if token is found then verify the token
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            // token holds the user id , get the user from database
            const user = await User.findById(decode.id);
              // if there is no user then return back
    if(!user){
        return res.status(404).json({ success:"false", data:"User is not longer exist"})
    }
    // now attach this user to req, to verify if the token person is the original user
    req.user = user;
    next();
        }
    } catch (error) {
          return res.status(401).json({
            success: "false",
            data: "Not authorized"
        });
    }
}

const authorize = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({success:"false", data:"Forbiden! You don't have permission to access"})
        }
        next();
    }
}

module.exports = { protect, authorize}