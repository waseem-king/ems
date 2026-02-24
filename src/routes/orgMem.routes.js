
const express = require("express");
const { orgMemController } = require("../controllers");
const router = express.Router();

router.post("/org-mem", orgMemController.createOrgMem);
router.get("/org-mem", orgMemController.getAllOrgMem);
router.get("/org-mem/:id", orgMemController.getOneOrgMem);
router.put("/org-mem/:id",orgMemController.updateOrgMem);
router.delete("/org-mem/:id", orgMemController.deleteOrgMem);

module.exports = router;

