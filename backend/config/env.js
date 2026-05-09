import 'dotenv/config';

export const ENV_VARIABLES = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || 3000,
};

if (!ENV_VARIABLES.MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined');
}

if (!ENV_VARIABLES.PORT) {
    throw new Error('PORT is not defined');
}