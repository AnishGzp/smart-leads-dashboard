import { MODULES, type ModuleValue } from "./modules.types.js";
import { ROLES, type Roles } from "./roles.types.js";

export const ROLE_PERMISSION: Record<Roles, readonly ModuleValue[]> = {
  [ROLES.ADMIN]: Object.values(MODULES),
  [ROLES.SALES]: [MODULES.DASHBOARD, MODULES.LEADS],
};
