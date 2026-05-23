import express from "express";

import { loginValidation } from "../validators/auth.validator.js";
import { authController } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/login", loginValidation, authController.login);

export default authRoutes;
