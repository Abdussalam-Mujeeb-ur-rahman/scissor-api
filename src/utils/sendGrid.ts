import nodemailer from "nodemailer"; // import nodemailer for sending emails

import { Env_vars } from "../../config/env_var"; // import the Env_vars class from the config folder to access environment variables.
const env_vars = new Env_vars(); // create a new instance of the Env_vars class to access its properties and methods.
const { gmail, gmailPass, NODE_ENV } = env_vars; // extract the gmail, gmailPass, and NODE_ENV properties from the env_vars object.

// Create a transporter using Gmail SMTP with explicit port and TLS
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: gmail,
    pass: gmailPass, // This should be an App Password from Gmail
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Define an async function 'sendConfirmationEmail' that takes an email address and a confirmation link as arguments
export const sendConfirmationEmail = async (
  email: string,
  confirmationLink: string
) => {
  // Create an email message object with the required properties
  const mailOptions = {
    from: gmail, // sender's email address
    to: email, // recipient's email address
    subject: "Email confirmation", // subject of the email
    text: `Please click on the following link to confirm your email: ${confirmationLink} .`, // plain text content of the email
    html: `<p>Please click <a href="${confirmationLink}">here</a> to confirm your email.</p>`, // HTML content of the email
  };

  try {
    // Always try to send the email (removed development mode check)
    console.log("📧 Attempting to send email...");
    console.log("From:", gmail);
    console.log("To:", email);
    console.log("Confirmation Link:", confirmationLink);

    await transporter.sendMail(mailOptions); // send the email using nodemailer
    console.log("✅ Email sent successfully!");
    return `confirmation link has been sent to ${email}`; // return a message indicating the email has been sent
  } catch (error) {
    console.error("Error sending confirmation link", error); // log an error message if there was a problem sending the email
    return `Error sending confirmation link. Please try again!`; // return a message indicating there was an error sending the confirmation link
  }
};
