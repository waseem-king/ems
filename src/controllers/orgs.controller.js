// Organization Controller - CRUD Operations for Organizations

const { default: mongoose } = require("mongoose");
const AppError = require("../middleware/appError");
const { orgsServices } = require("../services");
const asyncHandler = require("../utils/asyncHandler");
class OrgsController {
  // ----------------------------- Create Organization -----------------------------
  createOrg = asyncHandler(async (req, res) => {
    const data = req.body;
    if (!Object.keys(data).length) {
      throw new AppError("Organization data is required", 400);
    }
    const newOrgsServices = new orgsServices();
    const org = await newOrgsServices.createOrg(req.body);
    res.json({ status: "success", data: org });
  });

  // ----------------------------- Get All Organizations -----------------------------
  getAllOrgs = asyncHandler(async (req, res) => {
    const newOrgsServices = new orgsServices();
    const data = await newOrgsServices.getAllOrgs();
    res.json({ status: "success", data: data });
  });

  // ----------------------------- Get Organization by ID -----------------------------
  getOne = asyncHandler(async (req, res) => {
    const newOrgsServices = new orgsServices();
    const data = await newOrgsServices.getOne(req.params.id);
    res.json({ status: "success", data: data });
  });

  // ----------------------------- Update Organization -----------------------------
  updateOne = asyncHandler(async (req, res) => {
    const newOrgsServices = new orgsServices();
    const data = await newOrgsServices.updateOrg(req.params.id, req.body);
    res.json({ status: "success", data: data });
  });

  // ----------------------------- Delete Organization -----------------------------
  deleteOrg = asyncHandler(async (req, res) => {
    const newOrgsServices = new orgsServices();
    const data = await newOrgsServices.deleteOrg(req.params.id);
    res.json({ status: "success", data: data });
  });

  ////////////////////////////////    ORG AGGREGATION CONTROLLER ///////////////////////////////////////
  orgDashboard = asyncHandler(async (req, res) => {
    const orgId = new mongoose.Types.ObjectId(req.user.id);
    const query = req.query;
    const newOrgsServices = new orgsServices();
    const data = await newOrgsServices.getOrgDashboard(orgId, query);
    res.json({ status: "success", data: data });
  });
}

module.exports = OrgsController;
