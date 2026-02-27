
const { budgetServices } = require("../services");
const asyncHandler = require("../utils/asyncHandler");

class BudgetController{
    setMyBudget = asyncHandler( async (req, res)=>{
        const response = await budgetServices.setBudget({
            ...req.body,
            ownerId:req.user.id,
            ownerType:req.user.ownerType
    });
        res.status(201).json({ status:"success", data:response});
    })
     getMyBudget = asyncHandler( async (req, res)=>{
        const response = await budgetServices.getBudget(req.user.id, req.params.id)
        res.status(200).json({ status:"success", data:response});
    })
     updateMyBudget = asyncHandler( async (req, res)=>{
        const response = await budgetServices.updateBudget(req.user.id, req.params.id, req.body)
        res.status(200).json({ status:"success", data:response});
    })
    
}

module.exports = new BudgetController;