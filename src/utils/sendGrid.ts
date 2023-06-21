import sgMail from '@sendgrid/mail'; // import the SendGrid mail module for sending emails

import { Env_vars } from '../../config/env_var'; // import the Env_vars class from the config folder to access environment variables
const env_vars = new Env_vars(); // create a new instance of the Env_vars class to access its properties and methods
const { SEC_KEY, gmail } = env_vars; // extract the SEC_KEY and gmail properties from the env_vars object

sgMail.setApiKey(SEC_KEY); // set the SendGrid API key using the SEC_KEY value

// Define an async function 'sendConfirmationEmail' that takes an email address and a confirmation link as arguments
export const sendConfirmationEmail = async (email: string, confirmationLink: string) => {
    // Create an email message object with the required properties
    const msg = {
        to: email, // recipient's email address
        from: gmail, // sender's email address
        subject: "Email confirmation", // subject of the email
        text: `Please click on the following link to confirm your email: ${confirmationLink} .`, // plain text content of the email
        html: `<p>Please click <a href=${confirmationLink}>here</a> to confirm your email.</p>` // HTML content of the email
    };

    try {
        await sgMail.send(msg); // send the email using the SendGrid mail module
        return `confirmation link has been sent to ${email}` // return a message indicating the email has been sent
    } catch (error) {
        console.error("Error sending confirmation link", error); // log an error message if there was a problem sending the email
        return `Error sending confirmation link. Please try again!` // return a message indicating there was an error sending the confirmation link
    }
}
