"""
Expense Category Classifier
A keyword-based classifier to predict expense categories from expense titles/descriptions
"""

import re
from typing import Dict, List

# Define category keywords - mapping keywords to expense categories
CATEGORY_KEYWORDS = {
    "food": [
        "restaurant", "food", "meal", "lunch", "dinner", "breakfast", "coffee", 
        "cafe", "pizza", "burger", "sandwich", "snack", "drink", "beverage",
        "grocery", "supermarket", "cook", "kitchen", "delivery", "takeout"
    ],
    "transportation": [
        "uber", "lyft", "taxi", "cab", "gas", "fuel", "petrol", "parking",
        "toll", "bus", "train", "metro", "subway", "flight", "airline",
        "car", "vehicle", "auto", "transport", "travel", "rent", "lease"
    ],
    "shopping": [
        "amazon", "ebay", "walmart", "target", "store", "shop", "buy",
        "purchase", "clothing", "clothes", "shoes", "accessories", "gift",
        "electronics", "phone", "laptop", "computer", "furniture"
    ],
    "entertainment": [
        "movie", "film", "netflix", "spotify", "hulu", "disney", "game",
        "gaming", "concert", "ticket", "event", "show", "party", "club",
        "bar", "night", "entertainment", "hobby", "sport", "gym", "fitness"
    ],
    "utilities": [
        "electric", "electricity", "water", "gas bill", "internet", "wifi",
        "phone bill", "mobile", "utility", "bill", "power", "cable", "net"
    ],
    "healthcare": [
        "doctor", "hospital", "pharmacy", "medicine", "drug", "medical",
        "health", "dental", "dentist", "eye", "vision", "prescription",
        "therapy", "insurance", "clinic", "wellness"
    ],
    "education": [
        "book", "course", "tuition", "school", "college", "university",
        "training", "workshop", "class", "education", "learning", "exam",
        "subscription", "membership", "membership"
    ],
    "office": [
        "office", "supplies", "staples", "printer", "ink", "paper",
        "desk", "chair", "equipment", "software", "license", "domain",
        "hosting", "cloud", "service"
    ],
    "travel": [
        "hotel", "motel", "airbnb", "resort", "lodging", "accommodation",
        "vacation", "trip", "booking", "hostel", "suite", "room"
    ],
    "other": []  # Default category
}

# Create reverse lookup for quick matching
def _build_category_lookup() -> Dict[str, str]:
    """Build a reverse lookup from keyword to category"""
    lookup = {}
    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            lookup[keyword.lower()] = category
    return lookup

CATEGORY_LOOKUP = _build_category_lookup()

def preprocess_text(text: str) -> str:
    """Clean and preprocess text"""
    if not text:
        return ""
    # Convert to lowercase and remove special characters
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    return text

def find_category_from_keywords(text: str) -> str:
    """Find category based on keyword matching"""
    processed_text = preprocess_text(text)
    words = processed_text.split()
    
    # Check for keyword matches
    for word in words:
        if word in CATEGORY_LOOKUP:
            return CATEGORY_LOOKUP[word]
    
    # Check for partial matches (substring)
    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword in processed_text:
                return category
    
    return "other"

def classify_expense(title: str, description: str = "") -> str:
    """
    Classify an expense into a category based on title and description
    
    Args:
        title: The expense title/description
        description: Optional additional description
        
    Returns:
        The predicted category name
    """
    # Combine title and description for classification
    combined_text = f"{title} {description}".strip()
    
    if not combined_text:
        return "other"
    
    # Find category using keyword matching
    category = find_category_from_keywords(combined_text)
    
    return category

def get_all_categories() -> List[str]:
    """Return list of all available categories"""
    return list(CATEGORY_KEYWORDS.keys())

if __name__ == "__main__":
    # Test the classifier
    test_expenses = [
        "Lunch at McDonald's",
        "Uber ride to airport",
        "Amazon purchase - headphones",
        "Netflix subscription",
        "Electricity bill",
        "Pharmacy - prescription",
        "Gym membership",
        "Hotel booking for vacation"
    ]
    
    print("Testing Expense Category Classifier:")
    print("-" * 50)
    for expense in test_expenses:
        category = classify_expense(expense)
        print(f"{expense:40} -> {category}")
