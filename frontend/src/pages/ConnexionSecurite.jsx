// ============================================================
// pages/ConnexionSecurite.jsx
// ============================================================

import { useState } from "react";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function ConnexionSecurite() {
  const { user, setUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await apiClient.patch("/users/me", { fullName, phone });
    setUser(res.data);
    setSaved(true);
  }

  return (
    <div className="page-connexion-securite container">
      <h1>Connexion et sécurité</h1>

      <form onSubmit={handleSubmit} className="simple-form">
        {saved && <p className="info-message">Informations mises à jour.</p>}

        <label>Nom complet</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label>Téléphone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>E-mail</label>
        <input value={user?.email || ""} disabled />

        <button type="submit" className="btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
