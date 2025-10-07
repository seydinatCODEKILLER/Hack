import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PanelTopDashed } from 'lucide-react';

export function WelcomeCard() {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Bienvenue Admin
        </CardTitle>
        <CardDescription>
          Gestion du Musée Virtuel 360°
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
            <PanelTopDashed className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Musée Virtuel 360°</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Gérez votre collection d'art et créez des expériences immersives
          </p>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dernière connexion:</span>
            <span className="font-medium">Maintenant</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}