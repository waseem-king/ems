const { orgMemRepository } = require("../repositories");


class OrgMemServices{
    async createOrgMem(data){
        return await orgMemRepository.createOrgMem(data)
    }
    async getAllOrgMem(){
        return await orgMemRepository.getAllOrgMem()
    }
   async getOneOrgMem(id){
        return await orgMemRepository.getOneOrgMem(id)
   }
   async updateOrgMem(id, data){
        return await orgMemRepository.updateOrgMem(id, data)
   }
   async deleteOrgMem(id){
        return await orgMemRepository.deleteOrgMem(id)
   }
}

module.exports = new OrgMemServices;