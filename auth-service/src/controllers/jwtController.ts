import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { User } from "../types/UserType";

const generateJWTToken = async (payload: User) => {
  const token = await jwt.sign(payload, config.jwt.secret);

  return token;
};

export { generateJWTToken };