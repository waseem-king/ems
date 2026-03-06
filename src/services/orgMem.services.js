// Organization Member Services - Business Logic for Org Membership

const { orgMemRepository } = require("../repositories");
const neworgMemRepository = new orgMemRepository();
class OrgMemServices {
    /**
     * Create organization member
     */
    async createOrgMem(data) {
        return await neworgMemRepository.createOrgMem(data);
    }

    /**
     * Get all organization members
     */
    async getAllOrgMem() {
        return await neworgMemRepository.getAllOrgMem();
    }

    /**
     * Get single organization member by ID
     */
    async getOneOrgMem(id) {
        return await neworgMemRepository.getOneOrgMem(id);
    }

    /**
     * Update organization member
     */
    async updateOrgMem(id, data) {
        return await neworgMemRepository.updateOrgMem(id, data);
    }

    /**
     * Delete organization member
     */
    async deleteOrgMem(id) {
        return await neworgMemRepository.deleteOrgMem(id);
    }
}

module.exports = OrgMemServices;

