import userModel from "../models/userModel";
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from "../utils/jwtUtils";

const signupUser = async (user: { username: string; email: string; password: string; }) => {
    const userExists = await userModel.getUserByEmail(user.email);
    if(userExists) {
        throw new Error("User already exists//409");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return userModel.createUser(user);
};

const loginUser = async (email: string, password: string) => {
    const user = await userModel.getUserByEmail(email);
    if(!user) {
        throw new Error('User not found//404');
    }
    if(! await bcrypt.compare(password, user.password)) {
        throw new Error('Password incorrect//401');
    }
    const token = generateToken(user.id);
    return token;
}

const getCurrentUser = async (token: string) => {
    const decodedToken = verifyToken(token);
    if(!decodedToken) {
        throw new Error('Invalid token//403');
    }

    const currentUserId: number = decodedToken.id;
    const user = await userModel.getUserbyId(currentUserId);
    const { password, ...userWithoutPassword } = user;
    if(!user) {
        throw new Error('User not found//404');
    }
    return userWithoutPassword;
}

const deleteUser = async (userId: number, token: string) => {
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        throw new Error('Invalid token//403');
    }

    const currentUser: number = decodedToken.id;
    if(currentUser === userId) {
        await userModel.deleteUser(userId);
    } else {
        throw new Error("You can only delete your own account//403");
    }
}

export default {
    signupUser,
    loginUser,
    deleteUser,
    getCurrentUser,
}