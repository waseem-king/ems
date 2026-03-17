const transporter = require("../config/email.config");

const sendMonthlyReportEmail = async (to, pdfPath, month)=>{
    const mailOptions = {
        from: `"Expense Manager" <${process.env.EMAIL_USER}>`,
        to,
        subject: `Monthly Expense Report - ${month}`,
        text: `Hello! Please find attached your monthly expense report.`,
        attachments: [
            {
                filename: "monthly-expense-report.pdf",
                path: pdfPath,
            }

        ]
    }
    await transporter.sendMail(mailOptions)
}

module.exports = { sendMonthlyReportEmail }

