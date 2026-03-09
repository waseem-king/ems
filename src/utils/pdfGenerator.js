const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateMonthlyReport = (expenses, month) => {
  const filePath = path.join(__dirname, `../reports/report-${Date.now()}.pdf`);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Monthly Expense Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Month: ${month}`);
  doc.text(`Generated Date: ${new Date().toDateString()}`);

  doc.moveDown();
  doc.text("Expenses:");

  let total = 0;

  expenses.forEach((exp) => {
    doc.text(`${exp.title} - $${exp.amount}`);
    total += exp.amount;
  });

  const avg = expenses.length ? total / expenses.length : 0;

  doc.moveDown();
  doc.text(`Total Expenses: $${total}`);
  doc.text(`Average Expense: $${avg}`);

  doc.end();

  return filePath;
};

module.exports = { generateMonthlyReport };

