// ==========================================================================
// Organization Member Controller - CRUD Operations for Organization Members
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const AppError = require("../middleware/appError");
const { orgMemServices } = require("../services");
const asyncHandler = require("../utils/asyncHandler");

// ==========================================================================

class OrgMemController {

    // ----------------------------- Create Organization Member -----------------------------
    createOrgMem = asyncHandler(async (req, res) => {
        const data = req.body;

        if (!Object.keys(data).length) {
            throw new AppError("Organization Member data is required", 400);
        }

        const orgMember = await orgMemServices.createOrgMem(data);
        res.json({ status: "success", data: orgMember });
    });


    // ----------------------------- Get All Organization Members -----------------------------
    getAllOrgMem = asyncHandler(async (req, res) => {
        const response = await orgMemServices.getAllOrgMem();
        res.json({ status: "success", data: response });
    });


    // ----------------------------- Get Organization Member by ID -----------------------------
    getOneOrgMem = asyncHandler(async (req, res) => {
        const response = await orgMemServices.getOneOrgMem(req.params.id);
        res.json({ status: "success", data: response });
    });


    // ----------------------------- Update Organization Member -----------------------------
    updateOrgMem = asyncHandler(async (req, res) => {
        const response = await orgMemServices.updateOrgMem(req.params.id, req.body);
        res.json({ status: "success", data: response });
    });


    // ----------------------------- Delete Organization Member -----------------------------
    deleteOrgMem = asyncHandler(async (req, res) => {
        const response = await orgMemServices.deleteOrgMem(req.params.id);
        res.json({ status: "success", data: response });
    });
}

// ==========================================================================

module.exports = new OrgMemController();
