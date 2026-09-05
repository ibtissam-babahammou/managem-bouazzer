// ============================================================
// pages/MesAdresses.jsx
// ============================================================

import { useEffect, useState } from "react";
import apiClient from "../api/client";

export default function MesAdresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAddresses();
  }, []);

  function loadAddresses() {
    apiClient.get("/addresses").then((res) => setAddresses(res.data)).finally(() => setLoading(false));
  }

  async function handleDelete(id) {
    await apiClient.delete(`/addresses/${id}`);
    loadAddresses();
  }

  if (loading) return <p className="container">Chargement...</p>;

  return (
    <div className="page-mes-adresses container">
      <h1>Adresses</h1>

      {addresses.length === 0 ? (
        <p>Vous n'avez pas encore d'adresse enregistrée. Une adresse est créée automatiquement lors de votre première commande.</p>
      ) : (
        <div className="addresses-list">
          {addresses.map((addr) => (
            <div key={addr.id} className="address-card">
              <p>
                <strong>{addr.full_name}</strong>
              </p>
              <p>{addr.street_and_number}</p>
              <p>
                {addr.postal_code} {addr.city}, {addr.country}
              </p>
              <button onClick={() => handleDelete(addr.id)}>Supprimer</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
