import 'dotenv/config';

export const ENV_VARIABLES = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development',
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
    RESEND_DOMAIN: process.env.RESEND_DOMAIN,
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

if (!ENV_VARIABLES.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not defined');
}


if (!ENV_VARIABLES.CLIENT_URL) {
    throw new Error('CLIENT_URL is not defined');
}

if (!ENV_VARIABLES.RESEND_DOMAIN) {
    throw new Error('RESEND_DOMAIN is not defined');
}