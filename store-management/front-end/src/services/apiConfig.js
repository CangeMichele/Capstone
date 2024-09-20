import axios from "axios";

// ----- Configurazione endpoint axios
const API_URL = "http://localhost:3000/api";
const api = axios.create({
  baseURL: API_URL,
});

// ----- aggiunge il token a tutte le richeste api
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;