// ============================================================
// pages/admin/AdminDashboard.jsx
// ============================================================

import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Tableau de bord</h1>
      <p>Bienvenue dans l'espace d'administration de Bou-Azzer Minerals.</p>

      <div className="admin-dashboard-links">
        <Link to="/admin/produits" className="admin-card">
          Gérer les produits
        </Link>
        <Link to="/admin/categories" className="admin-card">
          Gérer les catégories
        </Link>
        <Link to="/admin/stock" className="admin-card">
          Gérer l'inventaire
        </Link>
        <Link to="/admin/commandes" className="admin-card">
          Voir les commandes
        </Link>
        <Link to="/admin/rendez-vous" className="admin-card">
          Voir les rendez-vous
        </Link>
        <Link to="/admin/messages" className="admin-card">
          Voir les messages
        </Link>
        <Link to="/admin/faq" className="admin-card">
          Gérer les questions fréquentes
        </Link>
      </div>
    </div>
  );
}
