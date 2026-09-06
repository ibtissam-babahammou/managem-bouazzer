// ============================================================
// components/AdminRoute.jsx
// Empêche l'accès aux pages d'administration à toute personne
// qui n'est pas "admin" ou "employe".
// ============================================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="container">Chargement...</p>;

  if (!user || (user.role !== "admin" && user.role !== "employe")) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}
