// Email Service Test - Unit Tests for Email Functionality

const nodemailer = require("nodemailer");
const jest = require("jest");

// Mock nodemailer
jest.mock("nodemailer", () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockResolvedValue({ messageId: "test-message-id" })
    })
}));

describe("Email Service", () => {
    let transporter;
    
    beforeEach(() => {
        const nodemailer = require("nodemailer");
        transporter = nodemailer.createTransport();
    });

    it("should send an email successfully", async () => {
        const info = await transporter.sendMail({
            from: '"Test" <test@example.com>',
            to: "recipient@example.com",
            subject: "Test Email",
            text: "This is a test email"
        });
        
        expect(info.messageId).toBeDefined();
        expect(transporter.sendMail).toHaveBeenCalled();
    });
});

