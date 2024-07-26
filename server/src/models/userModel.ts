import { db } from '../config';
import bcrypt from 'bcryptjs';

interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
};

const createUser = async (user: User) => {
    const { username, email, password } = user;
    const result = await db.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, password]
    );
    return result.rows[0];
}

const getUserbyId = async (id: number) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
}

const getUserByEmail = async (email: string) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0];
}

const getAllUsers = async () => {
    const result = await db.query('SELECT id, username, email, created_at FROM users');
    return result.rows;
}

const deleteUser = async (userId: number) => {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    return result.rows[0];
};

export default {
    createUser,
    getUserbyId,
    getUserByEmail,
    getAllUsers,
    deleteUser
}