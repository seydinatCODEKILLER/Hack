import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Palette, Eye } from 'lucide-react';

const quickActions = [
  {
    title: 'Ajouter un artiste',
    description: 'Créer un nouveau profil d\'artiste',
    href: '/admin/artists/new',
    icon: Users
  },
  {
    title: 'Créer une œuvre',
    description: 'Ajouter une nouvelle œuvre à la collection',
    href: '/admin/artworks/new', 
    icon: Palette
  },
  {
    title: 'Voir l\'explorateur',
    description: 'Visualiser l\'expérience visiteur',
    href: '/explore',
    icon: Eye,
    external: true
  }
];

function QuickActionItem({ action }: { action: typeof quickActions[0] }) {
  const Icon = action.icon;
  
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">{action.title}</h3>
          <p className="text-sm text-muted-foreground">{action.description}</p>
        </div>
      </div>
      <Button size="sm" asChild>
        {action.external ? (
          <a href={action.href} target="_blank" rel="noopener noreferrer">
            Accéder
          </a>
        ) : (
          <Link to={action.href}>
            Accéder
          </Link>
        )}
      </Button>
    </div>
  );
}

export function QuickActions() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Actions Rapides</CardTitle>
        <CardDescription>
          Accédez rapidement aux fonctionnalités principales
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickActions.map((action, index) => (
          <QuickActionItem key={index} action={action} />
        ))}
      </CardContent>
    </Card>
  );
}