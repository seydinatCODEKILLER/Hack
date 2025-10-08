import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../sidebar/Sidebar";
import { Header } from "../header/Header";
import { useAuth } from "@/features/admin/auth/hooks/useAuth";

export const MainLayout = () => {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar userRole={user?.role} />
        <SidebarInset className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
