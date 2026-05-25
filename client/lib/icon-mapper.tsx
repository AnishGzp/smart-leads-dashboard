import {
  User,
  LayoutDashboard,
  BadgeDollarSign,
  FileExclamationPoint,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  User,
  LayoutDashboard,
  BadgeDollarSign,
  FileExclamationPoint,
};

export const getIcon = (
  iconName: string,
  className?: string,
): React.ReactNode => {
  const IconComponent = iconMap[iconName];

  if (!IconComponent)
    return <FileExclamationPoint className={`size-4 ${className}`} />;

  return <IconComponent className={`size-4 ${className}`} />;
};
