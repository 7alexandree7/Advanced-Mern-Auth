import 'dotenv/config';

export const ENV_VARIABLES = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development',
    TOKEN_EMAILTRAP: process.env.TOKEN_EMAILTRAP,
    MY_EMAIL: process.env.MY_EMAIL,
    SENDER_NAME: process.env.SENDER_NAME || 'Alexandre',
    SENDER_EMAIL: process.env.SENDER_EMAIL || 'hello@demomailtrap.co',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};

if (!ENV_VARIABLES.MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined');
}

if (!ENV_VARIABLES.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

if (!ENV_VARIABLES.PORT) {
    throw new Error('PORT is not defined');
}

if (!ENV_VARIABLES.NODE_ENV) {
    throw new Error('NODE_ENV is not defined');
}

if (!ENV_VARIABLES.TOKEN_EMAILTRAP) {
    throw new Error('TOKEN_EMAILTRAP is not defined');
}

if (!ENV_VARIABLES.MY_EMAIL) {
    throw new Error('MY_EMAIL is not defined');
}

if (!ENV_VARIABLES.SENDER_EMAIL || !ENV_VARIABLES.SENDER_NAME) {
    throw new Error('SENDER_EMAIL and SENDER_NAME must be defined');
}

if (!ENV_VARIABLES.CLIENT_URL) {
    throw new Error('CLIENT_URL is not defined');
}