import { useEffect, useState } from "react";
import api from "../utils/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await api.get("/products");
        setJobs(res.data);
      } catch (err) {
        console.error("Error al cargar trabajos:", err);
      }
    }
    fetchJobs();
  }, []);

  const trabajosPorMes = Array(12).fill(0);
  jobs.forEach(job => {
    const fecha = new Date(job.entryDate);
    if (!isNaN(fecha)) {
      const mes = fecha.getMonth();
      trabajosPorMes[mes]++;
    }
  });

  const chartData = {
    labels: [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ],
    datasets: [
      {
        label: "Trabajos por mes",
        data: trabajosPorMes,
        backgroundColor: "#ff7f00"
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  async function markAsDone(id) {
    try {
      await api.put(`/products/${id}`, { done: true });
      setJobs(jobs.map(j => j._id === id ? { ...j, done: true } : j));
    } catch (err) {
      console.error("Error al marcar como terminado:", err);
    }
  }

  async function deleteJob(id) {
    if (!window.confirm("¿Eliminar este trabajo?")) return;
    try {
      await api.delete(`/products/${id}`);
      setJobs(jobs.filter(j => j._id !== id));
    } catch (err) {
      console.error("Error al eliminar trabajo:", err);
    }
  }

  const totalTerminado = jobs
    .filter(j => j.done)
    .reduce((acc, j) => acc + (j.quote || 0), 0);

  const totalPendiente = jobs
    .filter(j => !j.done)
    .reduce((acc, j) => acc + (j.quote || 0), 0);

  const totalGeneral = totalTerminado + totalPendiente;

  const trabajosOrdenados = [
    ...jobs.filter(j => !j.done),
    ...jobs.filter(j => j.done)
  ];

  return (
    <section className="App">
      <h2>Dashboard</h2>
      <p>Resumen de actividad y Finanza.</p>

      <div style={{ margin: "30px 0", background: "#1a1a1a11", padding: "20px", borderRadius: "8px" }}>
        <h3 style={{ color: "#ff7f00" }}>Resumen financiero</h3>
        <p>✅ Trabajos terminados: <strong>${totalTerminado.toLocaleString("es-AR")}</strong></p>
        <p>⏳ Trabajos pendientes: <strong>${totalPendiente.toLocaleString("es-AR")}</strong></p>
        <p>💰 Total general en ARS: <strong>${totalGeneral.toLocaleString("es-AR")}</strong></p>
      </div>

      <h3>Trabajos por mes</h3>
      <Bar data={chartData} options={chartOptions} />

      <h3 style={{ marginTop: "40px" }}>Listado de trabajos</h3>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Cotización</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {trabajosOrdenados.map(job => (
            <tr key={job._id}>
              <td>{job.clientName}</td>
              <td>{job.jobType}</td>
              <td>{job.category?.name || "—"}</td>
              <td>${job.quote}</td>
              <td>{new Date(job.entryDate).toLocaleDateString()}</td>
              <td>{job.done ? "Terminado" : "Pendiente"}</td>
              <td>
                {!job.done && (
                  <button onClick={() => markAsDone(job._id)}>Terminar</button>
                )}
                <button onClick={() => deleteJob(job._id)} style={{ marginLeft: "10px" }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
