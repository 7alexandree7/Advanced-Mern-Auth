import 'dotenv/config';

export const ENV_VARIABLES = {
    MONGODB_URL: process.env.MONGODB_URL,
};

if (!ENV_VARIABLES.MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined');
}