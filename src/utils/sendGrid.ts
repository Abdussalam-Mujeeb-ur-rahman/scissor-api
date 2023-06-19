import sgMail from '@sendgrid/mail';

import { Env_vars } from '../../config/env_var';
const env_vars = new Env_vars();
const { SEC_KEY, gmail } = env_vars;

sgMail.setApiKey(SEC_KEY);

export const sendConfirmationEmail = async (email: string, confirmationLink: string) => {
    const msg = {
        to: email,
        from: gmail,
        subject: "Email confirmation",
        text: `Please click on the following link to confirm your email: ${confirmationLink} .`,
        html: `<p>Please click <a href=${confirmationLink}>here</a> to confirm your email.</p>`
    };

    try {
        await sgMail.send(msg);
        console.log('confirmation email sent!');
        return `confirmation link has been sent to ${email}`
    } catch (error) {
        console.error("Error sending confirmation link", error);
    }
}