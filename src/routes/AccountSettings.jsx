import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function AccountSettings() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await api.get("/categories");
        setServices(res.data);
      } catch (err) {
        console.error("Error al cargar categorías de servicios:", err);
      }
    }
    fetchServices();
  }, []);

  async function addService(e) {
    e.preventDefault();
    try {
      const res = await api.post("/categories", newService);
      setServices([...services, res.data]);
      setNewService({ name: "", description: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Error al agregar categoría de servicio");
    }
  }

  async function updateService(id) {
    try {
      const res = await api.put(`/categories/${id}`, editData);
      setServices(services.map(s => (s._id === id ? res.data : s)));
      setEditingId(null);
      setEditData({ name: "", description: "" });
    } catch (err) {
      setError("Error al editar categoría de servicio");
    }
  }

  async function deleteService(id) {
    try {
      await api.delete(`/categories/${id}`);
      setServices(services.filter(s => s._id !== id));
    } catch (err) {
      setError("Error al eliminar categoría de servicio");
    }
  }

  async function deleteAccount() {
    if (!window.confirm("¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.")) return;
    try {
      await api.delete("/users/me");
      logout();
      nav("/");
    } catch (err) {
      console.error("Error al eliminar cuenta:", err);
      setError(err.response?.data?.error || "No se pudo eliminar la cuenta");
    }
  }

  return (
    <section className="App">
      <h2>Configuración de cuenta</h2>

      <h3>Categoría de Servicios</h3>
      <form onSubmit={addService} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={newService.name}
          onChange={e => setNewService({ ...newService, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newService.description}
          onChange={e => setNewService({ ...newService, description: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#222", color: "#ffa726" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Nombre</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Descripción</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s._id} style={{ borderBottom: "1px solid #444" }}>
              {editingId === s._id ? (
                <>
                  <td style={{ padding: "10px" }}>
                    <input
                      value={editData.name}
                      onChange={e => setEditData({ ...editData, name: e.target.value })}
                    />
                  </td>
                  <td style={{ padding: "10px" }}>
                    <input
                      value={editData.description}
                      onChange={e => setEditData({ ...editData, description: e.target.value })}
                    />
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <button onClick={() => updateService(s._id)}>Guardar</button>
                    <button onClick={() => setEditingId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: "10px" }}>{s.name}</td>
                  <td style={{ padding: "10px" }}>{s.description || "—"}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <button
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        setEditingId(s._id);
                        setEditData({ name: s.name, description: s.description || "" });
                      }}
                    >
                      Editar
                    </button>
                    <button onClick={() => deleteService(s._id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "40px" }}>Eliminar cuenta</h3>
      <button onClick={deleteAccount} style={{ backgroundColor: "crimson", color: "white" }}>
        Eliminar mi cuenta
      </button>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </section>
  );
}
