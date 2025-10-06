import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/features/admin/auth/hooks/useAuth'
import { NotificationsMenu } from './NotificationsMenu'
import { UserMenu } from './UserMenu'
import { ThemeToggle } from './ThemeToggle'

export const Header = () => {
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-card sticky top-0 z-30 w-full">
      {/* Branding */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-foreground">NoteManager</h1>
          <p className="text-sm text-muted-foreground">
            Plateforme de gestion des notes
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationsMenu />
        <UserMenu user={user ?? undefined} />
      </div>
    </header>
  )
}