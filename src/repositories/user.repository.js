
const User = require("../models/user.model")

class UserRepository{
    async create(userData){
        return await User.create(userData)
    }
    async findExistingUser(id){
        return await User.findById(id)
    }
    async findAll(){
        return await User.find()
    }
    async findByEmail(email){
        return await User.findOne({email})
    }
    async deleteById(id){
        return await User.findByIdAndDelete(id)
    }
    async updateById(id, data){
        return await User.findByIdAndUpdate(id, data, { new:true, runValidators:true})
    }
}

module.exports = new UserRepository;
