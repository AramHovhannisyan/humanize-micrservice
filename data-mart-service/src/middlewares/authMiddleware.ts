import { Request, Response, NextFunction } from "express";
import { validateAccessToken } from "../services/tokenService";
import problem from "../errorHandling/problem";

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader) return next(problem(1003, req));

    const accessToken = authHeader.split('Bearer ')[1];
    const payload = await validateAccessToken(accessToken);

    if(!payload) return next(problem(1007, req));

    res.locals.user = {
      id: payload.id,
      email: payload.username,
    };

    next();
  } catch (error) {
    return next(problem(1001, req));
  }
}