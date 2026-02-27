
const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { budgetController } = require("../controllers");
const { createBudgetValidator, budgetIdParamValidator } = require("../validators/budget.validator");
const router = express.Router()

router.post("/budgets",
    protect,
    createBudgetValidator,
    budgetController.setMyBudget
);

router.get("/budgets/:id",
    protect,
    budgetIdParamValidator,
    budgetController.getMyBudget
);


router.put("/budgets/:id", 
    protect,
    budgetIdParamValidator,
    createBudgetValidator,
    budgetController.updateMyBudget
)

module.exports = router