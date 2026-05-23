import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../models/users.models.js";
import { authServices, type ILogin } from "../services/auth.services.js";
import { validationErrorHandler } from "../utils/validationErrorHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      validationErrorHandler(req);

      const inputData: IUser = req.body;
      const data = await authServices.register(inputData);

      sendSuccess(res, "User registered successful", data);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      validationErrorHandler(req);

      const inputData: ILogin = req.body;
      const data = await authServices.login(inputData);

      res.cookie("token", data, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Change to true in production with HTTPS
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      sendSuccess(res, "Login Successful");
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("token");

      sendSuccess(res, "Logout Successful");
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
