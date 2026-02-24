const { orgMembershipModel } = require("../models");

class OrgMemRepo{
    async createOrgMem(data){
        return await orgMembershipModel.create(data)
    }
    async getAllOrgMem(){
        return await orgMembershipModel
                    .find()
                    .populate("user", "name email")
                    .populate("organization", "name")
    }
    async getOneOrgMem(id){
        return await orgMembershipModel.findById(id)
    }
    async updateOrgMem(id, data){
        return await orgMembershipModel.findByIdAndUpdate(
            id, 
            data,
            { new:true, runValidators:true}
        )
    }
    async deleteOrgMem(id){
        await orgMembershipModel.findByIdAndDelete(id)
        return { message:"Organization Member deleted successfully"}
    }
}

module.exports = new OrgMemRepo;