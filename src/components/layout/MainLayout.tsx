import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../sidebar/Sidebar";
import { Header } from "../header/Header";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export const MainLayout = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]); // maintenant stable, pas de boucle

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
