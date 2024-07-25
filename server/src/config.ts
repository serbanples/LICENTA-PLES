import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;

export const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const jwt_secret = process.env.JWT_SECRET;
export const jwt_expiry = process.env.JWT_EXPIRES_IN;