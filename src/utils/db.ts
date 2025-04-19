import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const { MONGODB_URI, PORT } = process.env;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI environment variable is not defined');
    process.exit(1);
}

export const connectDB = async (): Promise<void> => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI,);

        // // Wait for the connection to be established
        // mongoose.connection.once('open', () => {
        console.log('MongoDB connection established successfully.');
        // });

        // // Handle connection errors
        // mongoose.connection.on('error', (err) => {
        //     console.error('MongoDB connection error:', err);
        //     process.exit(1); // Exit if there is a connection error
        // });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit if the initial connection fails
    }
};
