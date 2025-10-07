import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  subItems?: Array<{
    title: string;
    href: string;
    icon: React.ElementType;
  }>;
}

export function SidebarNavItem({ to, icon: Icon, label, subItems }: SidebarNavItemProps) {
  const location = useLocation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const hasSubItems = subItems && subItems.length > 0;
  const isActive =
    location.pathname === to ||
    (subItems && subItems.some(item => location.pathname.startsWith(item.href)));

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault();
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild={!hasSubItems}
        onClick={handleClick}
        isActive={isActive}
        className={cn('w-full', hasSubItems && 'cursor-pointer')}
      >
        {hasSubItems ? (
          // Bouton avec sous-menu
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </div>
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                isSubMenuOpen && 'rotate-180'
              )}
            />
          </div>
        ) : (
          // Lien simple
          <Link to={to} className="flex items-center gap-2 w-full">
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </Link>
        )}
      </SidebarMenuButton>

      {hasSubItems && isSubMenuOpen && (
        <div className="ml-4 mt-1 space-y-1">
          {subItems.map(subItem => (
            <SidebarMenuButton
              key={subItem.href}
              asChild
              isActive={location.pathname.startsWith(subItem.href)}
              className="w-full pl-6"
            >
              <Link to={subItem.href} className="flex items-center gap-2 w-full text-sm">
                <subItem.icon className="w-3 h-3" />
                <span>{subItem.title}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </div>
      )}
    </SidebarMenuItem>
  );
}
