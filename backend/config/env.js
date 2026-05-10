import 'dotenv/config';

export const ENV_VARIABLES = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development',
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