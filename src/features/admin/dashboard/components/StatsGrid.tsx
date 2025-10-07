import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Palette, PackageOpen, MapPin, ArrowRight } from 'lucide-react';

const stats = [
  {
    title: 'Artistes',
    value: '0',
    description: 'Artistes enregistrés',
    icon: Users,
    href: '/admin/artists',
    color: 'text-blue-600'
  },
  {
    title: 'Œuvres',
    value: '0', 
    description: 'Œuvres cataloguées',
    icon: Palette,
    href: '/admin/artworks',
    color: 'text-green-600'
  },
  {
    title: 'Panoramas',
    value: '1',
    description: 'Espaces virtuels',
    icon: PackageOpen,
    href: '/admin/panoramas',
    color: 'text-purple-600'
  },
  {
    title: 'Hotspots',
    value: '0',
    description: 'Points d\'intérêt',
    icon: MapPin,
    href: '/admin/panoramas/hotspots',
    color: 'text-orange-600'
  }
];

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const Icon = stat.icon;
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        <Icon className={`w-4 h-4 ${stat.color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground">{stat.description}</p>
        <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto" asChild>
          <Link to={stat.href} className="text-xs flex items-center gap-1">
            Voir détails
            <ArrowRight className="w-3 h-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
}