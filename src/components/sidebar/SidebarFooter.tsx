import { SidebarFooter } from '@/components/ui/sidebar'
import { useSidebar } from '@/hooks/useSidebar';
import { LayoutDashboard } from 'lucide-react'

export function AppSidebarFooter() {
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed"

  return (
    <SidebarFooter className="p-4 w-full flex-shrink-0 flex justify-center">
      {isCollapsed ? (
        <LayoutDashboard className="w-6 h-6 text-muted-foreground" />
      ) : (
        <p className="mt-4 text-xs text-muted-foreground text-center w-full">
          &copy; {new Date().getFullYear()} NoteManager
        </p>
      )}
    </SidebarFooter>
  )
}
