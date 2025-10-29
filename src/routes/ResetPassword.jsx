import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      const res = await api.post("/users/reset-password", { token, password });
      setMessage(res.data.message || "Contraseña actualizada correctamente.");
      setError("");
      setTimeout(() => nav("/login"), 3000);
    } catch (err) {
      console.log("Error al restablecer contraseña:", err.response?.data || err.message);
      setError(err.response?.data?.error || "No se pudo actualizar la contraseña.");
      setMessage("");
    }
  }

  return (
    <section className="App">
      <h2>Restablecer contraseña</h2>
      <p>Ingresá tu nueva contraseña para recuperar el acceso.</p>
      <form onSubmit={submit} style={{ marginTop: "20px" }}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          style={{ marginTop: "10px" }}
        />
        <button type="submit" style={{ marginTop: "10px" }}>Actualizar contraseña</button>
      </form>
      {message && <p style={{ color: "green", marginTop: "20px" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </section>
  );
}
