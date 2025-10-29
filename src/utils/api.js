import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://workflow-manager-backend-z51a.onrender.com/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined
  }
});

export default api;
