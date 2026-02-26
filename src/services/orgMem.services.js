// ==========================================================================
// Organization Member Services - Business Logic for Org Membership
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const { orgMemRepository } = require("../repositories");

// ==========================================================================

class OrgMemServices {
    /**
     * Create organization member
     */
    async createOrgMem(data) {
        return await orgMemRepository.createOrgMem(data);
    }

    /**
     * Get all organization members
     */
    async getAllOrgMem() {
        return await orgMemRepository.getAllOrgMem();
    }

    /**
     * Get single organization member by ID
     */
    async getOneOrgMem(id) {
        return await orgMemRepository.getOneOrgMem(id);
    }

    /**
     * Update organization member
     */
    async updateOrgMem(id, data) {
        return await orgMemRepository.updateOrgMem(id, data);
    }

    /**
     * Delete organization member
     */
    async deleteOrgMem(id) {
        return await orgMemRepository.deleteOrgMem(id);
    }
}

// ==========================================================================

module.exports = new OrgMemServices;
