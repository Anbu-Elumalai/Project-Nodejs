// authMiddleware.ts
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// @Middleware({ type: "before" })
export class AuthMiddleware implements ExpressMiddlewareInterface {
    use(req: any, res: Response, next: NextFunction) {
        console.log('Inside AuthMiddleware');
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        if (!token) {
            return res.status(403).send({
                status: 0,
                message: 'token not found',
            });
        }
        // Verify the token
        jwt.verify(token, '1234', (err: any, user: any) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token has expired' });
                }
                throw err;
            }
            // Attach the user to the request object
            req.user = user; // Ensure you have the 'user' property defined in Request interface
            next();
        });
    }
}
