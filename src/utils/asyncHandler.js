// ==========================================================================
// Async Handler - Wrapper for Async Route Handlers
// ==========================================================================

/**
 * Wrapper function to handle async errors in route handlers
 */
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// ==========================================================================

module.exports = asyncHandler;
