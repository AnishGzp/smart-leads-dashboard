import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { sidebarController } from "../controllers/sidebar.controller.js";

const sidebarRouter = express.Router();

sidebarRouter.use(authenticate);

sidebarRouter.get("/", sidebarController.getSidebar);

export default sidebarRouter;
