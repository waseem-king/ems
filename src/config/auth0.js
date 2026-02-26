// ==========================================================================
// Auth0 Configuration - Express OpenID Connect Setup
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const { auth } = require("express-openid-connect");

// ==========================================================================

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,

    authorizationParams: {
        response_type: "code",
        response_mode: "query"
    }
};

// ==========================================================================

module.exports = auth(config);
