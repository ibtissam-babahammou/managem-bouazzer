// ============================================================
// pages/MonCompte.jsx — Page centrale du compte
// (sans "Vos factures", comme demandé)
// ============================================================

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MonCompte() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container">
        <p>
          Veuillez <Link to="/connexion">vous connecter</Link> pour accéder à
          votre compte.
        </p>
      </div>
    );
  }

  return (
    <div className="page-mon-compte container">
      <h1>Mon compte</h1>

      <div className="account-layout">
        <div className="account-cards-grid">
          <Link to="/mon-compte/commandes" className="account-card">
            <h3>Vos commandes</h3>
            <p>Suivez, visualisez ou payez vos commandes</p>
          </Link>

          <Link to="/mon-compte/adresses" className="account-card">
            <h3>Adresses</h3>
            <p>Ajouter, supprimer ou modifier vos adresses</p>
          </Link>

          <Link to="/mon-compte/securite" className="account-card">
            <h3>Connexion et sécurité</h3>
            <p>Configurez vos paramètres de connexion</p>
          </Link>

          <Link to="/mon-compte/connaissances" className="account-card">
            <h3>Connaissances</h3>
            <p>Trouvez tous les articles partagés avec vous</p>
          </Link>
        </div>

        <div className="account-info-card">
          <div className="avatar">{user.full_name.charAt(0).toUpperCase()}</div>
          <p>{user.full_name}</p>
          <p>{user.phone}</p>
          <p>{user.email}</p>
          <Link to="/mon-compte/securite">✏️ Modifier les informations</Link>
        </div>
      </div>
    </div>
  );
}
