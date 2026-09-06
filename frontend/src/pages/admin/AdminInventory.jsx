// ============================================================
// pages/admin/AdminInventory.jsx
// ============================================================

import { useEffect, useState } from "react";
import apiClient from "../../api/client";

export default function AdminInventory() {
  const [inventory, setInventory] = useState([]);

  function load() {
    apiClient.get("/inventory").then((res) => setInventory(res.data));
  }

  useEffect(load, []);

  async function updateQuantity(productId, quantity) {
    await apiClient.patch(`/inventory/${productId}`, { quantity: Number(quantity) });
    load();
  }

  return (
    <div className="admin-inventory">
      <h1>Inventaire</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité en stock</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.product_id}>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  defaultValue={item.quantity}
                  onBlur={(e) => updateQuantity(item.product_id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
