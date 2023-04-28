import postgres from 'postgres';
import { config } from '../config/config';

const sql = postgres({
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
  username: config.db.user,
  password: config.db.pass,
});

export default sql;
