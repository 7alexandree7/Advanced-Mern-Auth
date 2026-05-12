import { mailtrapClient, sender } from "../mail/mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "verification-emails",
        })

        console.log("Verification email sent:", response);
    } catch (error) {
        throw new Error("Error sending verification email:", error);
        console.error("Error sending verification email:", error);
    }
}



export const sendWelcomeEmail = async (email, name) => {
    const recipient = [ { email } ];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "abeaf537-58da-464c-9655-bb6f68e7c63c",
            template_variables: {
                name: name,
                "company_info_name": "Auth Company",
            }

        })
    } catch (error) {
        throw new Error("Error sending welcome email:", error);
    }
}