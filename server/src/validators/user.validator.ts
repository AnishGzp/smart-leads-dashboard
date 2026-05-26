import { body } from "express-validator";

export const createUserValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20"),
  body("role").trim().notEmpty().withMessage("Role is required"),
];

export const updateUserValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("id")
    .trim()
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("Invalid user id"),
];
