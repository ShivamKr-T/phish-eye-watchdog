
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Home, FileText, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
    },
    {
      name: 'Email Analysis',
      href: '/analyze',
      icon: Mail,
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center border-b border-sidebar-border h-16">
          <Shield className="h-6 w-6 text-sidebar-primary mr-2" />
          <span className="font-bold text-xl text-black">PhishEye</span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center p-2 rounded-md hover:bg-sidebar-accent group bg-violet-700",
                    location.pathname === item.href && "bg-sidebar-accent/80"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={cn(
                    "h-5 w-5 mr-3",
                    location.pathname === item.href ? "text-sidebar-primary" : "text-sidebar-foreground" 
                  )} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <Shield className="h-4 w-4 text-sidebar-primary" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-black">Security Watchdog</p>
              <p className="text-xs text-sidebar-foreground/70 text-black">Active Protection</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="ml-auto flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <h2 className="text-sm font-medium">PhishEye Watchdog</h2>
              <p className="text-xs text-muted-foreground">Protecting your digital communications</p>
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
