
const jwt = require("jsonwebtoken")

const generateToken=(payload)=>{
    return jwt.sign(
        payload,
        process.env.JWT_SECRE,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
}

module.exports = {generateToken};
