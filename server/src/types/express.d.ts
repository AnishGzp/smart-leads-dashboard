import type { JWTPayload } from "../services/auth.services.ts";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
