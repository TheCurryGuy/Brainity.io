import dotenv from "dotenv";
dotenv.config();
export const JWT_PASSWORD = process.env.JWT_PASS;
export const MONGO_URL = process.env.DATABASE_URL;
export const GROQ_API = process.env.GROQ_API_KEY;