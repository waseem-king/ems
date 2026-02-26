"""
Flask API Server for Expense Category Classification
This server provides an endpoint to classify expense titles into categories
"""

from flask import Flask, request, jsonify
from classifier.model import classify_expense, get_all_categories
import os

app = Flask(__name__)

# Configuration
PORT = int(os.environ.get('AI_SERVICE_PORT', 5000))
HOST = os.environ.get('AI_SERVICE_HOST', '0.0.0.0')

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'expense-classifier',
        'version': '1.0.0'
    })

@app.route('/categorize', methods=['POST'])
def categorize():
    """
    Categorize an expense based on title and optional description
    
    Request body:
    {
        "title": "Lunch at restaurant",
        "description": "Optional description"  // optional
    }
    
    Response:
    {
        "category": "food",
        "confidence": "high"  // informational
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'title' not in data:
            return jsonify({
                'error': 'Title is required'
            }), 400
        
        title = data.get('title', '')
        description = data.get('description', '')
        
        if not title or not title.strip():
            return jsonify({
                'error': 'Title cannot be empty'
            }), 400
        
        # Classify the expense
        category = classify_expense(title, description)
        
        return jsonify({
            'category': category,
            'title': title
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/categories', methods=['GET'])
def categories():
    """Get all available categories"""
    return jsonify({
        'categories': get_all_categories()
    }), 200

if __name__ == '__main__':
    print(f"Starting Expense Classifier API on {HOST}:{PORT}")
    app.run(host=HOST, port=PORT, debug=True)
