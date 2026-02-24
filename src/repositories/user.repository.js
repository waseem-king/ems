
const auth0Model = require("../models/auth0.model");
const {userModel}= require("../models/index");
// this is the model for auth0 , the users sign up using auth0 will use this model


class UserRepository{
    // store user signed up using auth0
    async createByAuth0Id(auth0Id, data){
        return await auth0Model.create({auth0Id, data})
    }
    // find the stored user
    async findByAuth0Id(auth0Id){
        return await auth0Model.findOne({auth0Id})
    }
    // update using auth0 
    async updateByAuth0Id(auth0Id, data){
        return await auth0Model.findOneAndUpdate(
            {auth0Id},
            data,
            { new:true, runValidators:true}
        )
    }
    // delte using auth0
    async deleteByAuth0Id(auth0Id){
        return await auth0Model.findOneAndDelete({auth0Id})
    }


    async create(userData){
        return await userModel.create(userData)
    }
    async findExistingUser(id){
        return await userModel.findById(id)
    }
    async findAll(){
        return await userModel.find()
    }
    async findByEmail(email){
        return await userModel.findOne({email}).select("+password")
    }
    async deleteById(id){
        await userModel.findByIdAndDelete(id)
        return { message:"User deleted successfully"}
    }
    async updateById(id, data){
        return await userModel.findByIdAndUpdate(id, data, { new:true, runValidators:true})
    }
}

module.exports = new UserRepository;
