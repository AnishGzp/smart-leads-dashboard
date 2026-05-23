import type { Request } from "express";
import { validationResult } from "express-validator";
import { AppError } from "./handleError.js";

export function validationErrorHandler(req: Request) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new AppError(400, "Validation Error", validationErrors.array());
  }
}
