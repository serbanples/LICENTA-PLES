import { Request,  Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const message = err.message.split('//')[0];
    const statusCode: number = Number(err.message.split('//')[1]) || 500;
    res.status(statusCode).json({ message: message });
};

export default errorHandler