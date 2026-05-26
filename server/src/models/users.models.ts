import { model, Schema, type HydratedDocument } from "mongoose";
import { ROLES, type Roles } from "../types/roles.types.js";
import bcrypt from "bcryptjs";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Roles;

  comparePassword(candidate: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<IUser>;

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Email is required"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "Roles is required"],
      enum: Object.values(ROLES),
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRounds = 12;

  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

UserSchema.methods.comparePassword = async function (
  candidate: string,
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export const userModel = model<IUser>("User", UserSchema);
