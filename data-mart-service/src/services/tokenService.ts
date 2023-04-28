import Jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from "../config/config";

const validateAccessToken = async (token: string) => {
  try {
    const payload = Jwt.verify(token, config.jwt.secret) as JwtPayload;
    
    if(!payload) return null;
    
    return {
      id: payload.id,
      username: payload.username,
    };

  } catch (error) {
    console.log(error);
    
    return null;
  }
};

export { validateAccessToken };