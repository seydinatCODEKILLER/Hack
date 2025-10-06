import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../sidebar/Sidebar";
import { Header } from "../header/Header";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export const MainLayout = () => {
  const { user, initializeAuth } = useAuthStore((state) => ({
    user: state.user,
    initializeAuth: state.initializeAuth,
  }));

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar userRole={user?.role} />

        {/* Utiliser SidebarInset pour englober header + main */}
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
