import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleError } from "./utils/handleError.js";
import { dbConnect } from "./config/dbConnect.js";
import { adminSeeder } from "./config/seeding.js";
import { sendSuccess } from "./utils/apiResponse.js";
import authRoutes from "./routes/auth.routes.js";
import sidebarRouter from "./routes/sidebar.routes.js";
import userRoutes from "./routes/user.routes.js";

const PORT = process.env.PORT || 4001;

const app = express();

// Supporting middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// Health check
app.get("/api/health", (req, res) => {
  sendSuccess(res, "API is running fine", {
    timeStamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/sidebar", sidebarRouter);
app.use("/api/user", userRoutes);

// Global error handler
app.use(handleError);

const startServer = async () => {
  try {
    await dbConnect();

    await adminSeeder();

    app.listen(PORT, () => {
      console.log("App is listening in PORT:", PORT);
    });
  } catch (error) {
    console.error("\x1bFailed to start the server:\x1b\n", error);
    process.exit(1);
  }
};

startServer();
