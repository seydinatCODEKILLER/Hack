import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  School,
  Settings
} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarSeparator } from '@/components/ui/sidebar';
import { useAuth } from '@/features/admin/auth/hooks/useAuth';
import { SidebarNavItem } from './SidebarNavItem';
import { AppSidebarHeader } from './SidebarHeader';
import { AppSidebarFooter } from './SidebarFooter';

interface AppSidebarProps {
  userRole?: 'admin' | 'professor';
}

const adminNavItems = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Gestion Professeurs', href: '/admin/teachers', icon: Users },
  { title: 'Gestion Élèves', href: '/admin/students', icon: GraduationCap },
  { title: 'Gestion Classes', href: '/admin/classes', icon: School },
  { title: 'Gestion Matières', href: '/admin/subjects', icon: BookOpen },
];

const professorNavItems = [
  { title: 'Dashboard', href: '/professor/dashboard', icon: LayoutDashboard },
  { title: 'Saisie Notes', href: '/professor/grades', icon: BookOpen },
  { title: 'Mes Élèves', href: '/professor/students', icon: GraduationCap },
];

export const AppSidebar = ({ userRole }: AppSidebarProps) => {
  console.log(userRole);
  
  const { user } = useAuth();
  const navItems = userRole === 'admin' ? adminNavItems : professorNavItems;


  return (
    <Sidebar variant="sidebar" collapsible="icon" className='overflow-x-hidden flex-shrink-0'>
      <AppSidebarHeader appName="NoteManager" userRole={user?.role} />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarNavItem
                  key={item.title}
                  to={item.href}
                  icon={item.icon}
                  label={item.title}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Paramètres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarNavItem to="/settings" icon={Settings} label="Paramètres" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
};
