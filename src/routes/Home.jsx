import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Home() {
  return (
    <section className="App">
      <h2>Bienvenido a WorkFlow Manager</h2>
      <p>
WorkFlow Manager es tu espacio profesional para registrar, visualizar y administrar trabajos de forma clara, rápida y personalizada. Esta herramienta fue diseñada para adaptarse a tus necesidades como prestador de servicios, permitiéndote organizar clientes, cotizaciones, fechas y categorías con total control.
</p>
<p>
Desde este panel podés acceder al registro de nuevos trabajos, gestionar tus categorías, revisar el estado de cada tarea y visualizar tu progreso mensual en el Dashboard. Todo con una estética cuidada, pensada para reflejar tu identidad como SimioAstuto.
</p>
<p>
Empezá ahora a construir tu flujo de trabajo ideal. Cada acción que tomás acá te acerca a una gestión más eficiente, profesional y visualmente tuya.
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
