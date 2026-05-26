import { userModel, type UserDocument } from "../models/users.models.js";
import { ROLES, type Roles } from "../types/roles.types.js";
import { AppError } from "../utils/handleError.js";

export interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUpdateUserInput {
  name: string;
  id: string;
}

export class UserServices {
  async createUser(input: ICreateUserInput): Promise<UserDocument> {
    try {
      const existing = await userModel.findOne({ email: input.email });
      if (existing) {
        throw new AppError(409, "User already exist with same mail");
      }

      if (!Object.values(ROLES).includes(input.role as Roles)) {
        throw new AppError(400, "Invalid role");
      }

      const user = new userModel({ ...input });

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(input: IUpdateUserInput): Promise<UserDocument> {
    try {
      const user = await userModel.findByIdAndUpdate(input.id, {
        name: input.name,
      });
      if (!user) {
        throw new AppError(404, "User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<UserDocument> {
    try {
      const user = await userModel.findByIdAndDelete(id);
      if (!user) {
        throw new AppError(404, "User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUser(): Promise<UserDocument[]> {
    try {
      const user = await userModel.find({});

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getSpecificUser(id: string): Promise<UserDocument> {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        throw new AppError(404, "User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export const userServices = new UserServices();
