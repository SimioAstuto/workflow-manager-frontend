import { useEffect, useState } from "react";
import api from "../utils/api";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch {
      setCategories([]);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/categories", form);
      setForm({ name: "", description: "" });
      loadCategories();
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear categoría");
    }
  }

  async function deleteCategory(id) {
    if (!confirm("¿Eliminar esta categoría?")) return;
    await api.delete(`/categories/${id}`);
    loadCategories();
  }

  return (
    <section>
      <h2>Gestión de Categorías</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Descripción"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Crear categoría</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <ul>
        {categories.map(cat => (
          <li key={cat._id}>
            <strong>{cat.name}</strong> - {cat.description || "Sin descripción"}
            <button onClick={() => deleteCategory(cat._id)} style={{ marginLeft: "1rem" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
