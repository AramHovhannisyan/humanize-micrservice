import express from 'express';
import { loginUser, signupUser } from '../controllers/authController';

const authRouter = express.Router();
authRouter.route('/').post(loginUser);
authRouter.route('/create').post(signupUser);

export { authRouter };