import userModel from "../models/userModel";
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from "../utils/jwtutils";

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
        throw new Error('User not found');
    }
    if(! await bcrypt.compare(password, user.password)) {
        throw new Error('Password incorrect');
    }
    const token = generateToken(user.id);
    return token;
}

const deleteUser = async (userId: number, token: string) => {
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        throw new Error('Invalid token');
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
    deleteUser
}