import 'reflect-metadata'; // Required for routing-controllers
import { createExpressServer } from 'routing-controllers';
import { connectDB } from '../src/utils/db';
// import dotenv from 'dotenv';
import * as path from 'path';
import * as express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

// Database connection
connectDB();
console.log('Resolved controller path:', path.join(__dirname, './controllers/*.ts'));

// Create the Express app using routing-controllers
const app = createExpressServer({
    controllers: [path.join(__dirname, './controllers/*.js'), path.join(__dirname, './controllers/*.ts')], // Adjust the path to your controllers
    middlewares: [path.join(__dirname, './middleware/*.js'), path.join(__dirname, './middleware/*.ts')], // Adjust the path to your controllers
    defaultErrorHandler: true, // Handles errors thrown in your controllers
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files and views setup
// app.use(express.static(path.join(__dirname, '../public')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// Start server
const port = 6002;
const server = app.listen(port, () => {
    console.log('Server running on port:', port);
});

// Graceful shutdown
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
