import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any,
    public isOperational = true,
  ) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: error.details || null,
    });
  } else {
    console.log("Unexpected Error:\n", error.stack || error);
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
