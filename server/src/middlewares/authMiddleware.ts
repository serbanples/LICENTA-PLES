import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    try {
        verifyToken(token);
        next();
    } catch (error) {
        next(error);
    }
};

export default authenticateToken;