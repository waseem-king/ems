// ==========================================================================
// Organization Services - Business Logic for Organizations
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const { orgsRepository } = require("../repositories");

// ==========================================================================

class OrgsServices {
    /**
     * Create a new organization
     */
    async createOrg(data) {
        return await orgsRepository.createOrg(data);
    }

    /**
     * Get all organizations
     */
    async getAllOrgs() {
        return await orgsRepository.getAllOrgs();
    }

    /**
     * Get single organization by ID
     */
    async getOne(id) {
        return await orgsRepository.getOne(id);
    }

    /**
     * Update organization
     */
    async updateOrg(orgId, data) {
        return await orgsRepository.updateOrg(orgId, data);
    }

    /**
     * Delete organization
     */
    async deleteOrg(id) {
        return await orgsRepository.deleteOrg(id);
    }
}

// ==========================================================================

module.exports = new OrgsServices;
