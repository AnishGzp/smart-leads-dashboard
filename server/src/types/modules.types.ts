export const MODULES = {
  DASHBOARD: "Dashboard",
  USER: "User",
  LEADS: "Leads",
} as const;

export type ModuleValue = (typeof MODULES)[keyof typeof MODULES];
