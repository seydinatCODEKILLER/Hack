import { TrendingUp } from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue dans l'administration du Musée Virtuel
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <TrendingUp className="w-4 h-4" />
        <span>Statut: Actif</span>
      </div>
    </div>
  );
}