// Organization Member Routes - Organization Membership Endpoints

const express = require("express");
const router = express.Router();

// ----------------------------- Controllers -----------------------------
const { orgMemController } = require("../controllers");
const newOrgMemController = new orgMemController();
const { protect } = require("../middleware/auth.middleware");
const { createOrUpdateOrgMemberValidator, orgMemberIdParamValidator } = require("../validators/orgMember.validator");

// Routes

// Create new organization member
router.post("/org-mem", 
    protect,
    createOrUpdateOrgMemberValidator, 
    newOrgMemController.createOrgMem
);

// Get all organization members
router.get("/org-mem",
    protect,
    newOrgMemController.getAllOrgMem
);

// Get organization member by ID
router.get("/org-mem/:id",
    protect, 
    orgMemberIdParamValidator, 
    newOrgMemController.getOneOrgMem
);

// Update organization member by ID
router.put("/org-mem/:id", 
    protect,
    orgMemberIdParamValidator,
    createOrUpdateOrgMemberValidator,
    newOrgMemController.updateOrgMem
);

// Delete organization member by ID
router.delete("/org-mem/:id", 
    protect, 
    orgMemberIdParamValidator, 
    newOrgMemController.deleteOrgMem
);

module.exports = router;

