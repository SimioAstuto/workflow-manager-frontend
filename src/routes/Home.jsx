import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Home() {
  return (
    <section className="App">
      <h2>Bienvenido a WorkFlow Manager</h2>
      <p>
        Este aplicativo te permite gestionar tus trabajos, categorías y configuraciones de cuenta
        de forma profesional y modular. Iniciá sesión para comenzar o registrate si aún no tenés cuenta.
      </p>
      {!isLoggedIn() ? (
        <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
          <Link to="/login" className="nav-button">Iniciar sesión</Link>
          <Link to="/register" className="nav-button">Registrarse</Link>
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>Ya estás autenticado. Usá el menú superior para navegar.</p>
      )}
    </section>
  );
}
