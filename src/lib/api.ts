import axios from "axios";

const api = axios.create({
  baseURL: "https://errdashboard.onrender.com/api",
  timeout: 20000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

// Attach token automatically if present
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
