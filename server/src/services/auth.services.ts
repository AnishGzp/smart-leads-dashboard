import {
  userModel,
  type IUser,
  type UserDocument,
} from "../models/users.models.js";
import { ROLES, type Roles } from "../types/roles.types.js";
import { AppError } from "../utils/handleError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";

export interface JWTPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secret-key";

export class AuthServices {
  async register(input: IUser): Promise<UserDocument> {
    try {
      // Check if user already exists
      const existing = await userModel.findOne({ email: input.email });
      if (existing) {
        throw new AppError(409, "User already exists");
      }

      // Roles validation
      if (!Object.values(ROLES).includes(input.role as Roles)) {
        throw new AppError(400, "Invalid role");
      }

      const user = new userModel({
        ...input,
      });

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(input: ILogin): Promise<string> {
    // Find user by email
    const user = await userModel
      .findOne({ email: input.email })
      .select("+password");
    if (!user) {
      throw new AppError(401, "Invalid credentials");
    }

    // Compare password
    const isMatch = await user.comparePassword(input.password);

    if (!isMatch) {
      throw new AppError(401, "Invalid credentials");
    }

    const tokenPayload: JWTPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "7d" });

    return token;
  }
}

export const authServices = new AuthServices();
