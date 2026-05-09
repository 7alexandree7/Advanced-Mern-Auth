import mongoose from 'mongoose';
import { ENV_VARIABLES } from '../config/env.js';

export async function connectDB() {
    try {
        await mongoose.connect(ENV_VARIABLES.MONGODB_URL);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);

        process.exit(1);
    }
}