import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'mc';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || 'root';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;

export const config = {
  server: {
    port: SERVER_PORT,
  },
  db: {
    host: DB_HOST,
    name: DB_NAME,
    user: DB_USER,
    pass: DB_PASS,
    port: DB_PORT,
  },
};
