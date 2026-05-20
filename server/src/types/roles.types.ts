export const ROLES = {
  ADMIN: "ADMIN",
  SALES: "SALES",
} as const;

export type Roles = (typeof ROLES)[keyof typeof ROLES];
