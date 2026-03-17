const { generateMonthlyReport } = require("../../src/utils/pdfGenerator");
const fs = require("fs");
const path = require("path");

// 1. Mock Data: This mimics what MongoDB would return
const mockExpenses = [
    { title: "Internet Bill", amount: 60.00, defaultCurrency: "PKR", currency: "PKR" },
    { title: "KFC Lunch", amount: 15.50, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Office Supplies", amount: 120.25, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Uber Ride", amount: 22.00, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Amazon - Laptop Stand", amount: 45.99, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Netflix Subscription", amount: 15.99, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Electricity Bill", amount: 85.40, defaultCurrency: "PKR", currency: "$" },
    { title: "Starbucks Coffee", amount: 6.75, defaultCurrency: "PKR", currency: "$" },
    { title: "Gym Membership", amount: 40.00, defaultCurrency: "PKR", currency: "$" },
    { title: "Grocery Store", amount: 92.30, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Pharmacy - Medicine", amount: 25.15, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Gas Station", amount: 55.00, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Spotify Family Plan", amount: 16.99, defaultCurrency: "PKR", currency : "PKR"},
    { title: "Dinner - Pizza Hut", amount: 32.50, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Mobile Data Top-up", amount: 20.00, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Water Bill", amount: 35.20, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Apple iCloud Storage", amount: 2.99, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Pharmacy - Vitamins", amount: 18.50, defaultCurrency: "PKR", currency : "PKR"},
    { title: "Laundry Service", amount: 25.00, defaultCurrency: "PKR", currency : "PKR"},
    { title: "Cinema Tickets", amount: 28.00, defaultCurrency: "PKR", currency : "PKR"},
    { title: "Pet Food", amount: 42.75, defaultCurrency: "PKR", currency : "PKR"},
    { title: "Bookstore - Novel", amount: 14.95, defaultCurrency: "PKR", currency : "PKR"},
    { title: "Car Wash", amount: 15.00, defaultCurrency: "PKR", currency: "PKR" },
    { title: "Donation - Charity", amount: 50.00, defaultCurrency: "PKR", currency : "PKR"},
    { title: "Parking Fee", amount: 8.50, defaultCurrency: "PKR", currency: "PKR" }


]

const mockMonth = "October 2025";
console.log("🚀 Starting PDF Generation Test...");

async function PDFGenerateTest() {
    try {
        // 2. Call the function
        const filePath = await generateMonthlyReport(mockExpenses, mockMonth)
        console.log("FIle path where is the report generatd", filePath)
        console.log("File Exists:", fs.existsSync(filePath));
        // 3. Verify the file existsnode test/utils/test-pdf.js
        if (fs.existsSync(filePath)) {
            console.log("✅ Success! PDF generated at:");
            console.log(path.resolve(filePath));
            console.log("\n👉 Go to that folder and open the file to check the design.");
        } else {
            console.error("❌ File was not created. Check your folder permissions.");
        }
    } catch (error) {
        console.error("💥 Error during test:", error.message);
    }
}

// call the function here
PDFGenerateTest()
