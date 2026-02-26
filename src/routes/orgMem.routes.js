
// ==========================================================================
// Organization Member Routes - Organization Membership Endpoints
// ==========================================================================

const express = require("express");
const router = express.Router();

// ----------------------------- Controllers -----------------------------
const { orgMemController } = require("../controllers");
const { protect } = require("../middleware/auth.middleware");
const { createOrUpdateOrgMemberValidator, orgMemberIdParamValidator } = require("../validators/orgMember.validator");

// ==========================================================================
// Routes
// ==========================================================================

// Create new organization member
router.post("/org-mem", 
    protect,
    createOrUpdateOrgMemberValidator, 
    orgMemController.createOrgMem
);

// Get all organization members
router.get("/org-mem",
    protect,
    orgMemController.getAllOrgMem
);

// Get organization member by ID
router.get("/org-mem/:id",
    protect, 
    orgMemberIdParamValidator, 
    orgMemController.getOneOrgMem
);

// Update organization member by ID
router.put("/org-mem/:id", 
    protect,
    orgMemberIdParamValidator,
    createOrUpdateOrgMemberValidator,
    orgMemController.updateOrgMem
);

// Delete organization member by ID
router.delete("/org-mem/:id", orgMemController.deleteOrgMem);

// ==========================================================================

module.exports = router;

