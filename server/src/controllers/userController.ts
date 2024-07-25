import { Request, Response } from "express";
import userModel from "../models/userModel";
import userService from "../services/userService";

const signupUser = async (req: Request, res: Response, next: Function) => {
    try {
        await userService.signupUser(req.body);
        res.status(201).send("User created successfully");
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req: Request, res: Response, next: Function) => {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);
        res.send({ token: token });
    } catch (error) {
        next(error);
    }
}

const getUserbyId = async (req: Request, res: Response) => {
    try {
        const user = await userModel.getUserbyId(Number(req.params.id));
        if(user) {
            res.json(user);
            res.status(200);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving user');
    }
}

const getAllUsers = async (req: Request, res: Response, next: Function) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch(error) {
        next(error);
    }
}

const deleteUser = async (req: Request, res: Response, next: Function) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        await userService.deleteUser(Number(req.params.id), String(token));
        res.status(200).json({ "message": 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export default {
    signupUser,
    loginUser,
    getUserbyId,
    getAllUsers,
    deleteUser
}