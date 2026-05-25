import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/handleError.js";
import { ROLE_PERMISSION } from "../types/permissions.types.js";
import type { Roles } from "../types/roles.types.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { SIDEBAR_CONFIG } from "../config/sidebar.config.js";

export class SidebarController {
  async getSidebar(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.user?.role as Roles;

      if (!role) {
        throw new AppError(400, "Unauthorized access");
      }

      const allowed = new Set(ROLE_PERMISSION[role]);

      const sidebarData = SIDEBAR_CONFIG.filter((item) =>
        allowed.has(item.module),
      );

      sendSuccess(res, "Sidebar Data fetched successfully", sidebarData);
    } catch (error) {
      next(error);
    }
  }
}

export const sidebarController = new SidebarController();
