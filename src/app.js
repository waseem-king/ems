// ==========================================================================
// App Module - Main Express Application Configuration
// ==========================================================================

// ----------------------------- Core Dependencies -----------------------------
const express = require("express");
const app = express();

// ----------------------------- Security & Middleware -------------------------
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");

// ----------------------------- Config & Routes ------------------------------
const logger = require("./config/logger");
const auth0 = require("./config/auth0");
const userRoutes = require("./routes/user.routes");
const { orgRoutes, orgMemRoutes, expenseRoutes } = require("./routes");

// ==========================================================================
// Security Middleware
// ==========================================================================

// Helmet - Prevents XXS attacks
app.use(helmet());

// CORS - Cross-platform resource sharing
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

// ==========================================================================
// Body Parsers
// ==========================================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fix for Express 5: make req.query writable before mongo-sanitize
app.use((req, res, next) => {
    Object.defineProperty(req, 'query', {
        value: req.query,
        writable: true,
        configurable: true
    });
    next();
});

// ==========================================================================
// Data Sanitization & Protection
// ==========================================================================

// Mongo Sanitize - Prevents SQL injection through query params
app.use(
    mongoSanitize({
        allowDots: true,
        replaceWith: "_"
    })
);

// XSS Clean - Prevents cross-site scripting attacks
app.use(xss());

// HPP - Prevents HTTP parameter pollution
app.use(hpp());

// ==========================================================================
// Logging Configuration
// ==========================================================================

app.use(
    morgan("combined", {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    })
);

// ==========================================================================
// Authentication
// ==========================================================================

app.use(auth0);

// ==========================================================================
// Rate Limiting
// ==========================================================================

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

// ==========================================================================
// Static Files
// ==========================================================================

app.use(express.static("./public"));

// ==========================================================================
// API Routes
// ==========================================================================

// User routes
app.use("/api", limiter, userRoutes);

// Organization routes
app.use("/api", orgRoutes);

// Organization member routes
app.use("/api", orgMemRoutes);

// Expense routes
app.use("/api", expenseRoutes);

// ==========================================================================
// Profile Route
// ==========================================================================

app.get("/profile", (req, res) => {
    if (!req.oidc.isAuthenticated()) {
        return res.status(401).json({ message: "Not logged in" });
    }

    res.json(req.oidc.user);
});

// ==========================================================================
// Error Handling Middleware
// ==========================================================================

app.use((err, req, res, next) => {
    console.error(err);

    logger.error({
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode || 500,
        path: req.originalUrl,
        method: req.method
    });

    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message
    });
});

// ==========================================================================

module.exports = app;
