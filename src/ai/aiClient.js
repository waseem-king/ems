// ==========================================================================
// AI Client - Interface to AI Expense Categorization Service
// ==========================================================================

// ----------------------------- Dependencies -----------------------------
const axios = require('axios');

// ----------------------------- Configuration -----------------------------
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';
const AI_SERVICE_TIMEOUT = parseInt(process.env.AI_SERVICE_TIMEOUT, 10) || 5000;

// ==========================================================================

/**
 * Categorize an expense based on its title using the AI service
 * @param {string} title - The expense title/description
 * @param {string} description - Optional additional description
 * @returns {Promise<string>} - The predicted category
 */
async function categorizeExpense(title, description = '') {
    try {
        const response = await axios.post(
            `${AI_SERVICE_URL}/categorize`,
            {
                title,
                description
            },
            {
                timeout: AI_SERVICE_TIMEOUT,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && response.data.category) {
            return response.data.category;
        }

        // Fallback if response format is unexpected
        console.warn('Unexpected AI service response format:', response.data);
        return 'other';
    } catch (error) {
        // Log detailed error for debugging
        if (error.code === 'ECONNREFUSED') {
            console.error('AI service is not running. Please start the AI service on port 5000.');
        } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
            console.error('AI service request timed out');
        } else if (error.response) {
            console.error('AI service error:', error.response.status, error.response.data);
        } else {
            console.error('AI service error:', error.message);
        }

        throw error;
    }
}

/**
 * Check if the AI service is available
 * @returns {Promise<boolean>}
 */
async function isAIServiceAvailable() {
    try {
        const response = await axios.get(`${AI_SERVICE_URL}/health`, {
            timeout: 2000
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

/**
 * Get all available categories from the AI service
 * @returns {Promise<string[]>}
 */
async function getAvailableCategories() {
    try {
        const response = await axios.get(`${AI_SERVICE_URL}/categories`, {
            timeout: AI_SERVICE_TIMEOUT
        });
        return response.data.categories || [];
    } catch (error) {
        console.error('Failed to get categories from AI service:', error.message);
        return [];
    }
}

// ==========================================================================

module.exports = {
    categorizeExpense,
    isAIServiceAvailable,
    getAvailableCategories
};
