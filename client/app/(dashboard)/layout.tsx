import AppSidebar from "@/components/app/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="px-6 py-2">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
