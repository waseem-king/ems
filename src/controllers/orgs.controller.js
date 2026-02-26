// ==========================================================================
// Organization Controller - CRUD Operations for Organizations
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const AppError = require("../middleware/appError");
const { orgsServices } = require("../services");
const asyncHandler = require("../utils/asyncHandler");

// ==========================================================================

class OrgsController {

    // ----------------------------- Create Organization -----------------------------
    createOrg = asyncHandler(async (req, res) => {
        const data = req.body;

        if (!Object.keys(data).length) {
            throw new AppError("Organization data is required", 400);
        }

        const org = await orgsServices.createOrg(req.body);
        res.json({ status: "success", data: org });
    });


    // ----------------------------- Get All Organizations -----------------------------
    getAllOrgs = asyncHandler(async (req, res) => {
        const data = await orgsServices.getAllOrgs();
        res.json({ status: "success", data: data });
    });


    // ----------------------------- Get Organization by ID -----------------------------
    getOne = asyncHandler(async (req, res) => {
        const data = await orgsServices.getOne(req.params.id);
        res.json({ status: "success", data: data });
    });


    // ----------------------------- Update Organization -----------------------------
    updateOne = asyncHandler(async (req, res) => {
        const data = await orgsServices.updateOrg(
            req.params.id,
            req.body
        );
        res.json({ status: "success", data: data });
    });


    // ----------------------------- Delete Organization -----------------------------
    deleteOrg = asyncHandler(async (req, res) => {
        const data = await orgsServices.deleteOrg(req.params.id);
        res.json({ status: "success", data: data });
    });
}

// ==========================================================================

module.exports = new OrgsController();
