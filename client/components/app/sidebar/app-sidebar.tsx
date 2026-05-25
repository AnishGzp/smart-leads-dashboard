"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IResponse } from "@/types/response.types";
import { ISidebar } from "@/types/sidebar.types";
import { ChartCandlestick } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NavMain from "./NavMain";

export default function AppSidebar() {
  const [sidebarData, setSidebarData] = useState<ISidebar[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSidebarData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/sidebar`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        const data: IResponse = await response.json();

        if (!response.ok || !data.success) {
          toast.error(data.message || "Internal Server Error");
          return;
        }

        const sidebar = data.data as ISidebar[];

        setSidebarData(sidebar);
      } catch (error) {
        toast.error("Inernal Server Error");
      } finally {
        setLoading(false);
      }
    };
    fetchSidebarData();
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/dashboard">
                <div className="flex items-center gap-2">
                  <ChartCandlestick className="size-6" />
                  <h2 className="text-lg font-semibold">
                    Smart<span className="text-brand">Leads</span>
                  </h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {loading ? (
          <p>Loading...</p>
        ) : sidebarData ? (
          <NavMain sidebarData={sidebarData} />
        ) : (
          <p>There was an error. Please refresh the page.</p>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
