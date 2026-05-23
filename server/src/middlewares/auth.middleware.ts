import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { JWTPayload } from "../services/auth.services.js";
import { sendSuccess } from "../utils/apiResponse.js";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secret-key";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      sendSuccess(res, "Unauthorized Access", null, 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
