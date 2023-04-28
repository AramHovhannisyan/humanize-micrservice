import { Request, Response, NextFunction } from 'express';
import { createOne, login } from '../services/userService';

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Please provide username and password'
      }
    });
  }

  const token = await login(username, password);

  if (!token) {
    return res.status(404).json({
      status: 'fail',
      message: 'Wrong Username Or Pass'
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      token
    }
});
};

const signupUser = async (req: Request, res: Response, next: NextFunction) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Please provide username and password'
      }
    });
  }

  const token = await createOne(username, password);
  if (!token) {
    return res.status(409).json({
      status: 'fail',
      data: {
        message: 'Cant Create'
      }
    });
  }

  return res.status(200).json({
      status: 'success',
      data: {
        token
      }
  });
};

export { signupUser, loginUser };