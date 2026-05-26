import type { NextFunction, Request, Response } from "express";
import { validationErrorHandler } from "../utils/validationErrorHandler.js";
import {
  userServices,
  type ICreateUserInput,
  type IUpdateUserInput,
} from "../services/user.services.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { AppError } from "../utils/handleError.js";

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      validationErrorHandler(req);

      const inputData: ICreateUserInput = req.body;
      const data = await userServices.createUser(inputData);

      sendSuccess(res, "User created successfully", data);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      validationErrorHandler(req);

      const inputData: IUpdateUserInput = req.body;
      const data = await userServices.updateUser(inputData);

      sendSuccess(res, "User updated successfully", data);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = userServices.deleteUser(id as string);

      sendSuccess(res, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userServices.getAllUser();

      sendSuccess(res, "Users fetched successfully", users);
    } catch (error) {
      next(error);
    }
  }

  async getSpecificUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new AppError(400, "The user id is required");
      }

      const user = await userServices.getSpecificUser(id as string);

      sendSuccess(res, "User fetched successfully", user);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
