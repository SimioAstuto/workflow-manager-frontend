import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", form);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
  }

  return (
    <section className="App">
      <h2>Iniciar sesión</h2>
      <form onSubmit={submit}>
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
        <button type="submit">Ingresar</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </section>
  );
}
