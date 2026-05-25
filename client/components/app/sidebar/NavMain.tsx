"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getIcon } from "@/lib/icon-mapper";
import { ISidebar } from "@/types/sidebar.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMain({ sidebarData }: { sidebarData: ISidebar[] }) {
  const pathName = usePathname();

  return (
    <SidebarMenu>
      {sidebarData.map((item, index) => (
        <SidebarMenuItem key={index}>
          <Link href={item.path}>
            <SidebarMenuButton isActive={pathName === item.path}>
              <div className="flex items-center gap-2">
                {getIcon(item.icon)}
                <p>{item.label}</p>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
