import { MailtrapClient } from "mailtrap";
import { ENV_VARIABLES } from "../config/env.js";

const TOKEN = ENV_VARIABLES.TOKEN_EMAILTRAP;

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: ENV_VARIABLES.SENDER_EMAIL,
    name: ENV_VARIABLES.SENDER_NAME,
};
