import { MailtrapClient } from "mailtrap";
import { ENV_VARIABLES } from "../config/env.js";

const TOKEN = ENV_VARIABLES.TOKEN_EMAILTRAP;

const client = new MailtrapClient({
    token: TOKEN,
});

const sender = {
    email: ENV_VARIABLES.SENDER_EMAIL,
    name: ENV_VARIABLES.SENDER_NAME,
};
const recipients = [
    {
        email: ENV_VARIABLES.MY_EMAIL,
    }
];

client
    .send({
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        text: "Congrats for sending test email with Mailtrap!",
        category: "Integration Test",
    })
    .then(console.log, console.error);