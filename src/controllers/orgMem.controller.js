// Organization Member Controller - CRUD Operations for Organization Members
const AppError = require("../middleware/appError");
const { orgMemServices } = require("../services");
const asyncHandler = require("../utils/asyncHandler");

class OrgMemController {
  // ----------------------------- Create Organization Member -----------------------------
  createOrgMem = asyncHandler(async (req, res) => {
    const data = req.body;
    if (!Object.keys(data).length) {
      throw new AppError("Organization Member data is required", 400);
    }
    const newOrgMemServices = new orgMemServices();
    const orgMember = await newOrgMemServices.createOrgMem(data);
    res.json({ status: "success", data: orgMember });
  });

  // ----------------------------- Get All Organization Members -----------------------------
  getAllOrgMem = asyncHandler(async (req, res) => {
    const newOrgMemServices = new orgMemServices();
    const response = await newOrgMemServices.getAllOrgMem();
    res.json({ status: "success", data: response });
  });

  // ----------------------------- Get Organization Member by ID -----------------------------
  getOneOrgMem = asyncHandler(async (req, res) => {
    const newOrgMemServices = new orgMemServices();
    const response = await newOrgMemServices.getOneOrgMem(req.params.id);
    res.json({ status: "success", data: response });
  });

  // ----------------------------- Update Organization Member -----------------------------
  updateOrgMem = asyncHandler(async (req, res) => {
    const newOrgMemServices = new orgMemServices();
    const response = await newOrgMemServices.updateOrgMem(
      req.params.id,
      req.body,
    );
    res.json({ status: "success", data: response });
  });

  // ----------------------------- Delete Organization Member -----------------------------
  deleteOrgMem = asyncHandler(async (req, res) => {
    const newOrgMemServices = new orgMemServices();
    const response = await newOrgMemServices.deleteOrgMem(req.params.id);
    res.json({ status: "success", data: response });
  });
}

module.exports = OrgMemController;
