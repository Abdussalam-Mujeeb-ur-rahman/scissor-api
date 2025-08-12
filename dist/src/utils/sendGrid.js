"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer")); // import nodemailer for sending emails
const env_var_1 = require("../../config/env_var"); // import the Env_vars class from the config folder to access environment variables.
const env_vars = new env_var_1.Env_vars(); // create a new instance of the Env_vars class to access its properties and methods.
const { gmail, gmailPass, NODE_ENV } = env_vars; // extract the gmail, gmailPass, and NODE_ENV properties from the env_vars object.
// Create a transporter using Gmail SMTP with explicit port and TLS
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: gmail,
        pass: gmailPass, // This should be an App Password from Gmail
    },
    tls: {
        rejectUnauthorized: false,
    },
});
// Define an async function 'sendConfirmationEmail' that takes an email address and a confirmation link as arguments
const sendConfirmationEmail = (email, confirmationLink) => __awaiter(void 0, void 0, void 0, function* () {
    // Create an email message object with the required properties
    const mailOptions = {
        from: gmail,
        to: email,
        subject: "Email confirmation",
        text: `Please click on the following link to confirm your email: ${confirmationLink} .`,
        html: `<p>Please click <a href="${confirmationLink}">here</a> to confirm your email.</p>`, // HTML content of the email
    };
    try {
        // Always try to send the email (removed development mode check)
        console.log("📧 Attempting to send email...");
        console.log("From:", gmail);
        console.log("To:", email);
        console.log("Confirmation Link:", confirmationLink);
        yield transporter.sendMail(mailOptions); // send the email using nodemailer
        console.log("✅ Email sent successfully!");
        return `confirmation link has been sent to ${email}`; // return a message indicating the email has been sent
    }
    catch (error) {
        console.error("Error sending confirmation link", error); // log an error message if there was a problem sending the email
        return `Error sending confirmation link. Please try again!`; // return a message indicating there was an error sending the confirmation link
    }
});
exports.sendConfirmationEmail = sendConfirmationEmail;
//# sourceMappingURL=sendGrid.js.map