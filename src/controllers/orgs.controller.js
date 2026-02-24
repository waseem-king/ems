const AppError = require("../middleware/appError");
const { orgsServices } = require("../services");
const asyncHandler = require("../utils/asyncHandler");

class OrgsController{
    createOrg = asyncHandler( async (req, res)=>{
        const data = req.body;
        if(!Object.keys(data).length){
            throw new AppError("Orgnization data is required", 400)
        }
        const org = await orgsServices.createOrg(req.body)
        res.json({status:"success", data:org})
    })   
    getAllOrgs = asyncHandler( async (req, res)=>{
        const data = await orgsServices.getAllOrgs()
        res.json({status:"success", data:data})
    })
    getOne = asyncHandler( async (req, res)=>{
        const data = await orgsServices.getOne(req.params.id)
        res.json({status:"success", data:data})
    })
    updateOne = asyncHandler(async (req, res)=>{
        const data =await orgsServices.updateOrg(
            req.params.id,
            req.body
        )
        res.json({ status:"success", data:data})
    })
    deleteOrg = asyncHandler( async (req, res)=>{
        const data =await orgsServices.deleteOrg(req.params.id)
        res.json({ status:"success", data:data})
    })
}

module.exports = new OrgsController;