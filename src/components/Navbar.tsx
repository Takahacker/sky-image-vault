import { Link, useLocation } from "react-router-dom";
import { Cloud } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 smooth-transition">
            <div className="relative">
              <Cloud className="w-8 h-8 text-accent pulse-glow" />
            </div>
            <span className="text-xl font-bold text-primary-foreground">
              Demay's <span className="text-accent">Infra</span>
            </span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg smooth-transition ${
                isActive("/")
                  ? "glass-card text-accent"
                  : "text-primary-foreground hover:glass"
              }`}
            >
              Empresa
            </Link>
            <Link
              to="/grupo"
              className={`px-4 py-2 rounded-lg smooth-transition ${
                isActive("/grupo")
                  ? "glass-card text-accent"
                  : "text-primary-foreground hover:glass"
              }`}
            >
              Grupo
            </Link>
            <Link
              to="/clientes"
              className={`px-4 py-2 rounded-lg smooth-transition ${
                isActive("/clientes")
                  ? "glass-card text-accent"
                  : "text-primary-foreground hover:glass"
              }`}
            >
              Área de Clientes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
