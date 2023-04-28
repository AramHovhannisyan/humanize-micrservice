import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'MY-SEC';
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || 'MY-TOPIC';
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || '';
const DATA_URL = process.env.DATA_URL || '';
const KAFKA_SERVER = process.env.KAFKA_SERVER || '';

export const config = {
  jwt: {
    secret: JWT_SECRET,
  },
  server: {
    port: SERVER_PORT,
  },
  kafka: {
    topic: KAFKA_TOPIC,
    clientId: KAFKA_CLIENT_ID,
    server: KAFKA_SERVER,
  },
  data: {
    url: DATA_URL,
  }
};
