import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [categories, setCategories] = useState([{ name: "", description: "" }]);
  const [error, setError] = useState("");
  const nav = useNavigate();

  function handleCategoryChange(index, field, value) {
    const updated = [...categories];
    updated[index][field] = value;
    setCategories(updated);
  }

  function addCategoryField() {
    setCategories([...categories, { name: "", description: "" }]);
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        categories: categories.filter(c => c.name.trim() !== "")
      });

      if (res.status === 201 || res.data.message?.includes("registrado")) {
        nav("/login");
      } else {
        setError("No se pudo completar el registro");
      }
    } catch (err) {
      console.log("Error de registro:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error al registrarse");
    }
  }

  return (
    <section className="App">
      <h2>Registro</h2>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />

        <h3>Categoria Servicios</h3>
        {categories.map((cat, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Nombre de categoría"
              value={cat.name}
              onChange={e => handleCategoryChange(index, "name", e.target.value)}
              required={index === 0}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={cat.description}
              onChange={e => handleCategoryChange(index, "description", e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addCategoryField}>Agregar otra categoría</button>

        <button type="submit">Registrarse</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </section>
  );
}
