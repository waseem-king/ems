// ==========================================================================
// Organization Routes - Organization Management Endpoints
// ==========================================================================

const express = require("express");
const router = express.Router();

// ----------------------------- Controllers -----------------------------
const { orgsController } = require("../controllers");
const {
  createOrUpdateOrganizationValidator,
  organizationIdParamValidator,
} = require("../validators/organization.validator");
const { protect } = require("../middleware/auth.middleware");

// ==========================================================================
// Routes
// ==========================================================================

// Create new organization
router.post(
  "/orgs",
  protect,
  createOrUpdateOrganizationValidator,
  orgsController.createOrg,
);

// Get all organizations
router.get("/orgs", protect, orgsController.getAllOrgs);

// Get organization by ID
router.get(
  "/orgs/:id",
  protect,
  organizationIdParamValidator,
  orgsController.getOne,
);

// Update organization by ID
router.put(
  "/orgs/:id",
  protect,
  createOrUpdateOrganizationValidator,
  organizationIdParamValidator,
  orgsController.updateOne,
);

// Delete organization by ID
router.delete(
  "/orgs/:id",
  protect,
  organizationIdParamValidator,
  orgsController.deleteOrg,
);

// ==========================================================================

module.exports = router;
