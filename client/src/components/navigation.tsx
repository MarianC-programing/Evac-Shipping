import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/plans', label: 'Planes' },
    { path: '/location', label: 'Ubicación' },
    { path: '/contact', label: 'Contacto' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">EVAC</h1>
              <p className="text-xs text-gray-500">USA → Panamá</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`nav-link ${
                      isActive(item.path) ? 'active' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Link href="/tracking">
                    <Button variant="outline" size="sm">
                      Mis Paquetes
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <button
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </button>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link href="/tracking">
                  <button 
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mis Paquetes
                  </button>
                </Link>
                <button 
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link href="/login">
                <button 
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
