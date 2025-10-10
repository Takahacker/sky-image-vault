import { Link, useLocation } from "react-router-dom";
import { Cloud } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  // external clients area URL configurable at build time via Vite env (VITE_CLIENTS_URL)
  const clientsUrl = import.meta.env.VITE_CLIENTS_URL ?? "/clientes";
  const clientsIsExternal = typeof clientsUrl === "string" && clientsUrl.startsWith("http");

  const isActive = (path: string) => location.pathname === path;

  return (
    // set a CSS variable for navbar height (includes safe-area inset on mobile)
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
      style={{
        // ensure the nav content is pushed below any device notch / safe area
        paddingTop: 'env(safe-area-inset-top, 0px)',
        // fallback height 5rem (80px), plus safe-area-inset-top when available
        // store in --navbar-height so other elements can reference it
        ...( { ['--navbar-height']: 'calc(env(safe-area-inset-top, 0px) + 5rem)' } as React.CSSProperties ),
      } as React.CSSProperties}
    >
      <div className="container mx-auto px-4">
  <div className="flex items-center justify-between" style={{ height: '5rem' }}>
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
            <a
              href={clientsUrl}
              className={`px-4 py-2 rounded-lg smooth-transition ${
                isActive("/clientes")
                  ? "glass-card text-accent"
                  : "text-primary-foreground hover:glass"
              }`}
              {...(clientsIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Área de Clientes
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
