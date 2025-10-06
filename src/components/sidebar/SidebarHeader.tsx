import { School } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";
import { useSidebar } from "@/hooks/useSidebar";

interface AppSidebarHeaderProps {
  appName: string;
  userRole?: string;
}

export function AppSidebarHeader({ appName, userRole }: AppSidebarHeaderProps) {
  const { state } = useSidebar();

  return (
    <SidebarHeader className="p-4">
      <div
        className={`flex items-center ${state === "expanded" ? "gap-2" : ""}`}
      >
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
          <School className="h-5 w-5 text-primary-foreground" />
        </div>
        {state === "expanded" && (
          <div>
            <h2 className="font-semibold text-sidebar-foreground">{appName}</h2>
            <p className="text-xs text-muted-foreground capitalize">
              {userRole}
            </p>
          </div>
        )}
      </div>
    </SidebarHeader>
  );
}
