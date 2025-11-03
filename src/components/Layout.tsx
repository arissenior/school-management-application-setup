
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  FileText, 
  ClipboardCheck,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Élèves', href: '/students', icon: Users },
  { name: 'Enseignants', href: '/teachers', icon: GraduationCap },
  { name: 'Classes', href: '/classes', icon: BookOpen },
  { name: 'Emploi du temps', href: '/schedule', icon: Calendar },
  { name: 'Notes', href: '/grades', icon: FileText },
  { name: 'Présences', href: '/attendance', icon: ClipboardCheck },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">EduManage</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-card border-b border-border flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground mr-4"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {navigation.find(item => item.href === location.pathname)?.name || 'Accueil'}
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}