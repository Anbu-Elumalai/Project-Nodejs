import 'reflect-metadata'; // Import reflect-metadata
import { Action, createExpressServer } from 'routing-controllers';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { loadControllers, loadMiddlewares } from './utils/loaders';
import { connectDB } from './utils/db';
const applyMigrations = require('../scripts/applymigration');

dotenv.config();

const { MONGODB_URI, PORT } = process.env;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI environment variable is not defined');
    process.exit(1);
}

// Authorization checker
const authorizationChecker = async (action: Action): Promise<boolean> => {
    const user = action.request.user;
    return user !== undefined;
};

// Initialize the server
const initServer = async (): Promise<void> => {
    try {
        // Load controllers and middlewares
        const controllers = await loadControllers();
        const middlewares = await loadMiddlewares();

        // Create Express server
        const app = createExpressServer({
            controllers,
            middlewares,
            authorizationChecker,
        });

        app.use(cors());

        // Connect to the database
        await connectDB();

        // Start the server
        const serverPort = parseInt(PORT || '3000', 10);
        app.listen(serverPort, () => {
            console.log(`Server is running on http://localhost:${serverPort}`);
        });

    } catch (error) {
        console.error('Error initializing server:', error);
        process.exit(1);
    }
};

// Run the server initialization
initServer();
