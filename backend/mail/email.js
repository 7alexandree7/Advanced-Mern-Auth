import { ENV_VARIABLES } from "../config/env.js";
import { resend } from "./resend.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await resend.emails.send({
            from: ENV_VARIABLES.RESEND_DOMAIN,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        })

        console.log("Verification email sent:", response);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
}



export const sendWelcomeEmail = async (email, name) => {

    try {
        const response = await resend.emails.send({
            from: ENV_VARIABLES.RESEND_DOMAIN,
            to: email,
            subject: "Welcome to our app!",
            html: `
                <h1>Welcome ${name}!</h1>
                <p>Thanks for joining Auth Company.</p>
            `,
        });
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw error;
    }
}



export const sendResetPasswordEmail = async (email, resetURL) => {

    try {
        const response = await resend.emails.send({
            from: ENV_VARIABLES.RESEND_DOMAIN,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        })
    } catch (error) {
        console.error("Error sending reset password email:", error);
        throw error;
    }
}



export const sendResetSuccessEmail = async (email) => {

    try {
        const response = await resend.emails.send({
            from: ENV_VARIABLES.RESEND_DOMAIN,
            to: email,
            subject: "Your password has been reset",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        })
    } catch (error) {
        console.error("Error sending reset success email:", error);
        throw error;
    }
}