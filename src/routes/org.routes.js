// this is the module for writing routes for organization

const express = require("express");
const { orgsController } = require("../controllers");
const router = express.Router();


router.post("/orgs", orgsController.createOrg);
router.get("/orgs", orgsController.getAllOrgs);
router.get("/orgs/:id", orgsController.getOne)
router.put("/orgs/:id", orgsController.updateOne)
router.delete("/orgs/:id", orgsController.deleteOrg)

module.exports = router;