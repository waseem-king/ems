// Organization Services - Business Logic for Organizations
const { orgsRepository } = require("../repositories");
const newOrgsRepository = new orgsRepository ();
class OrgsServices {
    /**
     * Create a new organization
     */
    async createOrg(data) {
        return await newOrgsRepository.createOrg(data);
    }

    /**
     * Get all organizations
     */
    async getAllOrgs() {
        return await newOrgsRepository.getAllOrgs();
    }

    /**
     * Get single organization by ID
     */
    async getOne(id) {
        return await newOrgsRepository.getOne(id);
    }

    /**
     * Update organization
     */
    async updateOrg(orgId, data) {
        return await newOrgsRepository.updateOrg(orgId, data);
    }

    /**
     * Delete organization
     */
    async deleteOrg(id) {
        return await newOrgsRepository.deleteOrg(id);
    }

    //////////////////////////////// ORG AGGREGATION //////////////////////////////////////
    async getOrgDashboard(orgId, query){
        return await newOrgsRepository.getOrgDashboard(orgId, query)
    }
}

module.exports = OrgsServices;

