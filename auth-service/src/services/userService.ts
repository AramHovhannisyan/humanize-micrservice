import bcrypt from "bcrypt";
import sql from "../db/connect";
import { User } from "../types/UserType";
import { generateJWTToken } from '../controllers/jwtController';

const createOne = async (username: string, password: string) => {
  try {
    const candidate = await sql`SELECT * FROM public.users WHERE username=${username} ORDER BY id ASC`;
    
    if (candidate.count) {
      return null;
    } else {}

    const passHash = await bcrypt.hash(password, 3);
    const user = await sql<User[]>`INSERT INTO users (username, password) values (${username}, ${passHash}) returning id, username`;

    if (!user || !user.count) {
      return null;
    }

    const userPayload = user[0];    
    const token = generateJWTToken(userPayload);
    
    return token;

  } catch (error) {
    return null;
  }
};

const login = async (username: string, password: string) => {
  try {
    const candidate = await sql<User[]>`SELECT * FROM public.users WHERE username=${username} ORDER BY id ASC`;
    
    if (!candidate.count) {
      return null;
    }

    const arePasswordsEqual = await bcrypt.compare(password, candidate[0].password);

    if (!arePasswordsEqual) {
      return null;
    }

    const token = generateJWTToken(candidate[0]);

    return token;

  } catch (error) {
    console.log(error);
  }
};

export { createOne, login };