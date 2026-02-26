// ==========================================================================
// Routes Index - Export All Route Modules
// ==========================================================================

// ----------------------------- Route Modules -----------------------------
const expenseRoutes = require("./expense.routes");
const authRoutes = require("./auth.routes");
const orgRoutes = require("./org.routes");
const orgMemRoutes = require("./orgMem.routes");

// ==========================================================================

module.exports = {
    authRoutes,
    orgRoutes,
    orgMemRoutes,
    expenseRoutes,
};

