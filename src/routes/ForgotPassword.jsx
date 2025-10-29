import { useState } from "react";
import api from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/users/forgot-password", { email });
      setMessage(res.data.message || "Si el correo está registrado, recibirás instrucciones.");
      setError("");
    } catch (err) {
      console.log("Error al solicitar recuperación:", err.response?.data || err.message);
      setError(err.response?.data?.error || "No se pudo procesar la solicitud.");
      setMessage("");
    }
  }

  return (
    <section className="App">
      <h2>Recuperar contraseña</h2>
      <p>Ingresá tu correo electrónico y te enviaremos instrucciones para restaurar tu acceso.</p>
      <form onSubmit={submit} style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Correo registrado"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ marginBottom: "10px" }}
        />
        <button type="submit">Enviar instrucciones</button>
      </form>
      {message && <p style={{ color: "green", marginTop: "20px" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </section>
  );
}
