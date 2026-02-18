const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

// register the user
const register = async (req, res, next)=>{
     // get the data
    const { name, email, password, phone, avatar, defaultCurrency, occupation,  isEmailVerified, isActive, lastLogn} = req.body;
    const user = await User.create({name, email, password, phone, avatar, defaultCurrency, occupation,  isEmailVerified, isActive, lastLogn});
    if(!user){
        return res
                  .status(400)
                  .json({success:"false", data:"User is not created"})
    }
     res.status(201).json({
        status:"success",
        data: user || "User created successfully"
    })
}

// when user will login then generate new token 
const login = async (req, res, next)=>{
    // get email and password
    const { email, password, phone} = req.body;
      // find the user with these credentials
    const user = await User.findOne({email}).select("+password")
     if(!user){
        return res.status(404).json({ status:"false", data:"user not found"})
    }
    // now match the password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
         return res.status(401).json({ success:"false", data:"Invalid Credentials"})
    }
    // if user exist and password is matched the generated a new token
    const token = generateToken(user.id);
    user.lastLogin = Date.now();
    await user.save();
    res.json({
        success:"success",
        token:token
    })
}

module.exports = { register, login}