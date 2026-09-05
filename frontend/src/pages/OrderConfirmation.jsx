// ============================================================
// pages/OrderConfirmation.jsx
// ============================================================

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/client";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    apiClient.get(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p className="container">Chargement...</p>;

  return (
    <div className="page-order-confirmation container">
      <h1>Confirmed! ✅</h1>
      <p>Merci pour votre commande. Elle sera livrée à l'adresse indiquée.</p>
      <p>Mode de paiement : Paiement à la livraison</p>

      <div className="order-summary-list">
        {order.items.map((item, index) => (
          <div key={index} className="summary-row">
            <span>
              {item.product_name} × {item.quantity}
            </span>
            <span>{(item.price * item.quantity).toFixed(2)} DH</span>
          </div>
        ))}
        <div className="summary-row total">
          <span>Total</span>
          <span>{Number(order.total).toFixed(2)} DH</span>
        </div>
      </div>

      <Link to="/mon-compte" className="btn-primary">
        Voir mes commandes
      </Link>
    </div>
  );
}
