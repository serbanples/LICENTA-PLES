import jwt from 'jsonwebtoken';
import { jwt_secret, jwt_expiry } from '../config';

interface DecodedToken {
    id: number;
}

const generateToken = (userId: number) => {
    return jwt.sign({ id: userId }, jwt_secret as string, {
        expiresIn: jwt_expiry,
    });
};

const verifyToken = (token: string): DecodedToken | null => {
    try {
        return jwt.verify(token, jwt_secret as string) as DecodedToken;
    } catch (error) {
        throw new Error("Access token invalid");
    }
};

export { generateToken, verifyToken };