import type { ModuleValue } from "../types/modules.types.js";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  module: ModuleValue;
}

export const SIDEBAR_CONFIG: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "LayoutDashboard",
    module: "Dashboard",
  },
  {
    label: "Users",
    path: "/user",
    icon: "User",
    module: "User",
  },
  {
    label: "Leads",
    path: "/leads",
    icon: "BadgeDollarSign",
    module: "Leads",
  },
];
