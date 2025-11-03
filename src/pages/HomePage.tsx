
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Élèves inscrits',
    value: '1,234',
    icon: Users,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Enseignants',
    value: '87',
    icon: GraduationCap,
    change: '+3%',
    changeType: 'positive',
  },
  {
    name: 'Classes actives',
    value: '42',
    icon: BookOpen,
    change: '0%',
    changeType: 'neutral',
  },
  {
    name: 'Taux de présence',
    value: '94.2%',
    icon: TrendingUp,
    change: '+2.1%',
    changeType: 'positive',
  },
];

const recentActivities = [
  { id: 1, type: 'Nouvel élève', description: 'Marie Dubois a été inscrite en 3ème A', time: 'Il y a 2h' },
  { id: 2, type: 'Note ajoutée', description: 'Notes de mathématiques publiées pour la 2nde B', time: 'Il y a 4h' },
  { id: 3, type: 'Absence signalée', description: '3 absences enregistrées ce matin', time: 'Il y a 5h' },
  { id: 4, type: 'Réunion', description: 'Conseil de classe 1ère C programmé', time: 'Il y a 1j' },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div 
        className="relative rounded-lg overflow-hidden bg-gradient-to-r from-primary to-secondary p-8 text-primary-foreground"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=400&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 bg-primary/90 rounded-lg p-6 max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Bienvenue sur EduManage</h1>
          <p className="text-primary-foreground/90 text-lg">
            Gérez votre établissement scolaire de manière efficace et moderne
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Activités récentes</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.type}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Actions rapides</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <Users className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium text-foreground">Ajouter un élève</p>
            </button>
            <button className="p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <GraduationCap className="h-6 w-6 text-secondary mb-2" />
              <p className="font-medium text-foreground">Nouvel enseignant</p>
            </button>
            <button className="p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <BookOpen className="h-6 w-6 text-accent mb-2" />
              <p className="font-medium text-foreground">Créer une classe</p>
            </button>
            <button className="p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <TrendingUp className="h-6 w-6 text-info mb-2" />
              <p className="font-medium text-foreground">Voir les rapports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}