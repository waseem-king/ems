
const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { budgetController } = require("../controllers");
// create an instance of budget controller class
const newBudgetController = new budgetController();
const { createBudgetValidator, budgetIdParamValidator } = require("../validators/budget.validator");
const router = express.Router()

router.post("/budgets",
    protect,
    createBudgetValidator,
    newBudgetController.setMyBudget
);

////////////////////////////////////// ORG AGG ROUTE ///////////////////////////////////
router.get(
    "/budgets/budgetDashboard",
    protect,
    newBudgetController.budgetDashboard
)

router.get("/budgets/:id",
    protect,
    budgetIdParamValidator,
    newBudgetController.getMyBudget
);


router.put("/budgets/:id", 
    protect,
    budgetIdParamValidator,
    createBudgetValidator,
    newBudgetController.updateMyBudget
)

module.exports = router

