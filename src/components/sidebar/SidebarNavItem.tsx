import { NavLink } from "react-router-dom"
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

interface SidebarNavItemProps {
  to: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
}

export function SidebarNavItem({ to, icon: Icon, label }: SidebarNavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 transition-colors ${
              isActive
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
