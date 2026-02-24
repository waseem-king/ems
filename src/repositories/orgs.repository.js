// this the module for creating repository , db manipulating 

const organizationModel = require("../models/organization.model");

class OrgsRepository{
    // create an organization
    async createOrg(data){
        const org = await organizationModel.create(data);
        return org;
    }
    async getAllOrgs(){
        return organizationModel.find();
    }
    async getOne(orgId){
        const org = await organizationModel.findById(orgId)
        return org;
    }
    async updateOrg(orgId, data){
        const newOrg = await organizationModel.findByIdAndUpdate(
            orgId,
            data,
            { new:true, runValidators:true}
        )
        return newOrg;
    }
    async deleteOrg(id){
        await organizationModel.findByIdAndDelete(id)
        return { message:"Organization Deleted successfully"}
    }
}

module.exports = new OrgsRepository;