import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { canAccess } from "../middlewares/rbac.middleware.js";
import { MODULES } from "../types/modules.types.js";
import { userController } from "../controllers/user.controller.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../validators/user.validator.js";

const userRoutes = express.Router();

userRoutes.use(authenticate);
userRoutes.use(canAccess(MODULES.USER));

userRoutes.get("/", userController.getAllUser);
userRoutes.get("/:id", userController.getSpecificUser);
userRoutes.post("/", createUserValidation, userController.createUser);
userRoutes.patch("/", updateUserValidation, userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;
