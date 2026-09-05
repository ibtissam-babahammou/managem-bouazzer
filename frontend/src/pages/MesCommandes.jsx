// ============================================================
// pages/MesCommandes.jsx
// ============================================================

import { useEffect, useState } from "react";
import apiClient from "../api/client";

export default function MesCommandes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/orders").then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="container">Chargement...</p>;

  return (
    <div className="page-mes-commandes container">
      <h1>Vos commandes</h1>

      {orders.length === 0 ? (
        <p>Vous n'avez pas encore de commande.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <p>
                <strong>Commande du</strong>{" "}
                {new Date(order.created_at).toLocaleDateString("fr-FR")}
              </p>
              <p>Statut : {order.status}</p>
              <p>Total : {Number(order.total).toFixed(2)} DH</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.product_name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
