import { Request, Response, NextFunction } from 'express';
import { getTodosCount } from "../services/pgService";

const getData = async (req: Request, res: Response, next: NextFunction) => {

  const todosCount = await getTodosCount();

  return res.status(200).json({
      status: 'success',
      data: {
        todosCount,
      }
  });
};

export { getData };