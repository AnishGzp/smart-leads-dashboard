import type { NextFunction, Request, Response } from "express";
import type { ModuleValue } from "../types/modules.types.js";
import { AppError } from "../utils/handleError.js";
import { userModel } from "../models/users.models.js";
import { ROLE_PERMISSION } from "../types/permissions.types.js";

export const canAccess = (module: ModuleValue) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        throw new AppError(401, "Unauthorised access");
      }

      const existed = await userModel.findById(user.id);
      if (!existed) {
        throw new AppError(401, "Unauthorised access");
      }

      const permission = ROLE_PERMISSION[existed.role];

      if (!permission.includes(module)) {
        throw new AppError(403, "Forbidden Access");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
