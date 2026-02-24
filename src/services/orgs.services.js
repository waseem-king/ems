const { orgsRepository } = require("../repositories");


class OrgsServices{
    async createOrg(data){
        return await orgsRepository.createOrg(data)
    }
    async getAllOrgs(){
        return await orgsRepository.getAllOrgs()
    }
    async getOne(id){
        return await orgsRepository.getOne(id)
    }
    async updateOrg(orgId, data){
        return await orgsRepository.updateOrg(orgId, data)
    }
    async deleteOrg(id){
        return await orgsRepository.deleteOrg(id)
    }
}

module.exports = new OrgsServices;