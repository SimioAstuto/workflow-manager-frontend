import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';
import logo from '../assets/logo.png'; 

export default function NavBar() {
  const nav = useNavigate();
  const location = useLocation();

  function handleLogout(e) {
    e.preventDefault();
    logout();
    nav('/');
  }

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/jobs/new", label: "Nuevo" },
    { to: "/settings", label: "Cuenta" }
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <span className="app-name">WorkFlow Manager</span>
      </div>

      <div className="nav-links">
        {/* Enlaces protegidos */}
        {isLoggedIn() && (
          <>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-button ${location.pathname === link.to ? "activo" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            {/* Cerrar sesión como botón estilizado */}
            <a href="#" className="nav-button" onClick={handleLogout}>
              Cerrar sesión
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
