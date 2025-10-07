import {
  LayoutDashboard,
  Users,
  Palette,
  Image,
  Languages,
  Panda,
  MapPin,
  Settings
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarSeparator 
} from '@/components/ui/sidebar';
import { SidebarNavItem } from './SidebarNavItem';
import { AppSidebarHeader } from './SidebarHeader';
import { AppSidebarFooter } from './SidebarFooter';

interface AppSidebarProps {
  userRole?: 'admin';
}

const adminNavItems = [
  { 
    title: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    title: 'Artistes', 
    href: '/admin/artists', 
    icon: Users 
  },
  { 
    title: 'Œuvres', 
    href: '/admin/artworks', 
    icon: Palette,
    subItems: [
      { title: 'Médias', href: '/admin/artworks/media', icon: Image },
      { title: 'Traductions', href: '/admin/artworks/translations', icon: Languages }
    ]
  },
  { 
    title: 'Panoramas', 
    href: '/admin/panoramas', 
    icon: Panda,
    subItems: [
      { title: 'Hotspots', href: '/admin/panoramas/hotspots', icon: MapPin }
    ]
  },
];

export const AppSidebar = ({ userRole }: AppSidebarProps) => {
  
  // Pour l'instant, seul le rôle admin est supporté
  const navItems = adminNavItems;

  return (
    <Sidebar variant="sidebar" collapsible="icon" className='overflow-x-hidden flex-shrink-0'>
      <AppSidebarHeader appName="Musée Virtuel" userRole={userRole} />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation Principale</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarNavItem
                  key={item.title}
                  to={item.href}
                  icon={item.icon}
                  label={item.title}
                  subItems={item.subItems}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Système</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarNavItem to="/admin/settings" icon={Settings} label="Paramètres" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
};