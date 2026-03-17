// Organization Routes - Organization Management Endpoints
const express = require("express");
const router = express.Router();

// ----------------------------- Controllers -----------------------------
const { orgsController } = require("../controllers");
const newOrgsController = new orgsController();
const {
  createOrUpdateOrganizationValidator,
  organizationIdParamValidator,
} = require("../validators/organization.validator");
const { protect } = require("../middleware/auth.middleware");

// Routes
// Create new organization
router.post(
  "/orgs",
  protect,
  createOrUpdateOrganizationValidator,
  newOrgsController.createOrg
);

///////////////////////////////// ORG AGGREGATION ROUTES ////////////////////////////////////
router.get(
  "/orgs/orgDashboard",
  protect,
  newOrgsController.orgDashboard
)
// Get all organizations
router.get("/orgs", protect, newOrgsController.getAllOrgs);

// Get organization by ID
router.get(
  "/orgs/:id",
  protect,
  organizationIdParamValidator,
  newOrgsController.getOne,
);

// Update organization by ID
router.put(
  "/orgs/:id",
  protect,
  createOrUpdateOrganizationValidator,
  organizationIdParamValidator,
  newOrgsController.updateOne,
);

// Delete organization by ID
router.delete(
  "/orgs/:id",
  protect,
  organizationIdParamValidator,
  newOrgsController.deleteOrg,
);

module.exports = router;

