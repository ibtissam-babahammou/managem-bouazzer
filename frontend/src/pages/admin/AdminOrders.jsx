// ============================================================
// pages/admin/AdminOrders.jsx
// ============================================================

import { useEffect, useState } from "react";
import apiClient from "../../api/client";

const STATUSES = ["en_attente", "confirmee", "livree", "annulee"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  function load() {
    apiClient.get("/orders/admin/all").then((res) => setOrders(res.data));
  }

  useEffect(load, []);

  async function updateStatus(id, status) {
    await apiClient.patch(`/orders/admin/${id}/status`, { status });
    load();
  }

  return (
    <div className="admin-orders">
      <h1>Commandes</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Produits</th>
            <th>Total</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>
                {order.items.map((it) => `${it.product_name} ×${it.quantity}`).join(", ")}
              </td>
              <td>{Number(order.total).toFixed(2)} DH</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
