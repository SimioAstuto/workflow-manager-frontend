import { useEffect, useState } from "react";
import api from "../utils/api";

export default function JobsTable() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setJobs(res.data))
      .catch(() => setJobs([]));
  }, []);

  async function markCompleted(id) {
    await api.put(`/products/${id}`, { isCompleted: true });
    setJobs(jobs.map(job => job._id === id ? { ...job, isCompleted: true } : job));
  }

  async function deleteJob(id) {
    await api.delete(`/products/${id}`);
    setJobs(jobs.filter(job => job._id !== id));
  }

  return (
    <section>
      <h2>Trabajos</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Cotización</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job._id}>
              <td>{job.clientName}</td>
              <td>{job.jobType}</td>
              <td>{job.category?.name}</td>
              <td>${job.quote}</td>
              <td>{job.isCompleted ? "✔️" : "Pendiente"}</td>
              <td>
                {!job.isCompleted && <button onClick={() => markCompleted(job._id)}>Finalizar</button>}
                <button onClick={() => deleteJob(job._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
