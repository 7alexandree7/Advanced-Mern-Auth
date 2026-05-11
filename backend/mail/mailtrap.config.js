import { MailtrapClient } from "mailtrap";
import { ENV_VARIABLES } from "../config/env.js";

const TOKEN = ENV_VARIABLES.TOKEN_EMAILTRAP;

const client = new MailtrapClient({
    token: TOKEN,
});

const sender = {
    email: "hello@demomailtrap.co",
    name: "Alexandre",
};
const recipients = [
    {
        email: "alexandre020602@gmail.com",
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