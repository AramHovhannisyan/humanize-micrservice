import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'MY-SEC';
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || 'MY-TOPIC';
const KAFKA_OUTER_TOPIC = process.env.KAFKA_OUTER_TOPIC || 'MY-OUT-TOPIC';
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || '';
const KAFKA_SERVER = process.env.KAFKA_SERVER || '';
const KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID || '';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'mc';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || 'root';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;

export const config = {
  jwt: {
    secret: JWT_SECRET,
  },
  server: {
    port: SERVER_PORT,
  },
  kafka: {
    topic: KAFKA_TOPIC,
    topic_out: KAFKA_OUTER_TOPIC,
    groupId: KAFKA_GROUP_ID,
    clientId: KAFKA_CLIENT_ID,
    server: KAFKA_SERVER,
  },
  db: {
    host: DB_HOST,
    name: DB_NAME,
    user: DB_USER,
    pass: DB_PASS,
    port: DB_PORT,
  },
};
