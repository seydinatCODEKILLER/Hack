import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  {
    number: 1,
    title: 'Ajouter des artistes',
    description: 'Commencez par créer les profils de vos artistes'
  },
  {
    number: 2,
    title: 'Créer des œuvres',
    description: 'Ajoutez les œuvres d\'art avec leurs médias et traductions'
  },
  {
    number: 3,
    title: 'Configurer les hotspots',
    description: 'Placez les points d\'intérêt sur vos panoramas'
  }
];

function GuideStep({ step }: { step: typeof steps[0] }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-sm font-semibold text-primary">{step.number}</span>
      </div>
      <div>
        <h4 className="font-semibold">{step.title}</h4>
        <p className="text-sm text-muted-foreground">{step.description}</p>
      </div>
    </div>
  );
}

export function GettingStartedGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Guide de Démarrage</CardTitle>
        <CardDescription>
          Étapes recommandées pour configurer votre musée
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <GuideStep key={step.number} step={step} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}