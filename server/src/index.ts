import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { handleError } from "./utils/handleError.js";
import { dbConnect } from "./config/dbConnect.js";
import { sendSuccess } from "./utils/apiResponse.js";
import dns from "dns";

const PORT = process.env.PORT || 4001;

const app = express();

// Supporting middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Health check
app.get("/api/health", (req, res) => {
  sendSuccess(res, { timeStamp: new Date().toISOString() });
});

// Global error handler
app.use(handleError);

const startServer = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log("App is listening in PORT:", PORT);
    });
  } catch (error) {
    console.error("\x1bFailed to start the server:\x1b\n", error);
    process.exit(1);
  }
};

startServer();
