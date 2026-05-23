import { userModel } from "../models/users.models.js";
import { ROLES } from "../types/roles.types.js";

export async function adminSeeder() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASS;

    if (!email || !password) {
      throw new Error("Admin credentials are not found in .env");
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      console.log("Admin already exists");
      return;
    }

    const admin = new userModel({
      name: "Admin",
      email,
      password,
      role: ROLES.ADMIN,
    });

    await admin.save();

    console.log("Admin seeded successfully");
  } catch (error) {
    console.error("Admin seeding failed:\n", error);
  }
}
