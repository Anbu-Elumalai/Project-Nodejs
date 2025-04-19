import path from 'path';
import fs from 'fs';
// Controller and Middleware directories
const controllerDir = path.join(__dirname, '../', 'controllers');
const middlewareDir = path.join(__dirname, '../', 'middleware');
export const loadControllers = async (): Promise<any[]> => {
    const controllers: any[] = [];
    try {
        const files = fs.readdirSync(controllerDir);
        for (const file of files) {
            if (file.endsWith('Controller.ts') || file.endsWith('Controller.js')) {
                const controllerPath = path.join(controllerDir, file);
                const module = await import(controllerPath);
                const controller = module.default || module;
                console.log(`Loaded controller:`, controller);
                controllers.push(controller);
            }
        }
    } catch (err) {
        console.error('Error finding or loading controllers:', err);
    }
    return controllers;
};

export const loadMiddlewares = async (): Promise<any[]> => {
    const middlewares: any[] = [];
    try {
        const files = fs.readdirSync(middlewareDir);
        for (const file of files) {
            if (file.endsWith('Middleware.ts') || file.endsWith('Middleware.js')) {
                const middlewarePath = path.join(middlewareDir, file);
                const module = await import(middlewarePath);
                const middleware = module.default || module;
                console.log(`Loaded middleware:`, middleware);
                middlewares.push(middleware);
            }
        }
    } catch (err) {
        console.error('Error finding or loading middlewares:', err);
    }
    return middlewares;
};
