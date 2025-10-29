import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function JobForm() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    clientName: "",
    phone: "",
    jobType: "",
    category: "",
    quote: "",
    entryDate: ""
  });
  const nav = useNavigate();

  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  async function submit(e) {
    e.preventDefault();
    await api.post("/products", {
      clientName: form.clientName,
      phone: form.phone,
      jobType: form.jobType,
      category: form.category,
      quote: Number(form.quote),
      entryDate: new Date(form.entryDate).toISOString()
    });
    nav("/dashboard"); // ✅ redirige al dashboard
  }

  return (
    <section>
      <h2>Nuevo Trabajo</h2>
      <form onSubmit={submit}>
        <input placeholder="Cliente" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} required />
        <input placeholder="Teléfono" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Tipo de trabajo" value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value })} required />
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required>
          <option value="">Seleccionar categoría</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <input type="number" placeholder="Cotización" value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} required />
        <input type="date" value={form.entryDate} onChange={e => setForm({ ...form, entryDate: e.target.value })} required />
        <button type="submit">Guardar</button>
      </form>
    </section>
  );
}
