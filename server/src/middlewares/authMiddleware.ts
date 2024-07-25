import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: number;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        next();
    });
};

export default authenticateToken;