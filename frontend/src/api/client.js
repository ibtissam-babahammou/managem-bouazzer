// ============================================================
// api/client.js
// Point de connexion unique entre le site (Frontend) et le
// serveur (Backend). Toutes les pages passent par ce fichier
// pour parler au serveur — jamais directement.
// ============================================================

import axios from "axios";

// Cette adresse sera changée une seule fois, ici, lors du déploiement final.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Ajoute automatiquement le token de connexion à chaque requête, si présent
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Identifiant de session pour les visiteurs non connectés (panier)
  let sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);
  }
  config.headers["x-session-id"] = sessionId;

  return config;
});

export default apiClient;
