import { type NavItem, SIDEBAR_CONFIG } from "../config/sidebar.config.js";
import { ROLE_PERMISSION } from "../types/permissions.types.js";
import type { Roles } from "../types/roles.types.js";

export class SidebarServices {
  useSidebar(role: Roles): NavItem[] {
    const allowed = new Set(ROLE_PERMISSION[role]);
    return SIDEBAR_CONFIG.filter((item) => allowed.has(item.module));
  }
}
