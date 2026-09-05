// ============================================================
// pages/CheckoutPayment.jsx — Étape 3 : Mode de paiement
// Un seul mode disponible : Paiement à la livraison.
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import { useCart } from "../context/CartContext";
import CheckoutBreadcrumb from "../components/CheckoutBreadcrumb";

export default function CheckoutPayment() {
  const { subtotal, refreshCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const addressId = sessionStorage.getItem("checkout_address_id");

  useEffect(() => {
    if (!addressId) {
      navigate("/commande/adresse");
      return;
    }
    apiClient.get("/addresses").then((res) => {
      const found = res.data.find((a) => a.id === addressId);
      setAddress(found);
    });
  }, [addressId, navigate]);

  async function handleConfirm() {
    setPlacing(true);
    setError("");
    try {
      const res = await apiClient.post("/orders/checkout", { addressId });
      sessionStorage.removeItem("checkout_address_id");
      await refreshCart();
      navigate(`/commande/confirmation/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la validation de la commande.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="page-checkout-payment container">
      <CheckoutBreadcrumb step={2} />
      <h1>Mode de paiement</h1>

      <div className="checkout-layout">
        <div className="payment-methods">
          <label className="payment-option selected">
            <input type="radio" checked readOnly />
            Paiement à la livraison
          </label>

          {address && (
            <div className="billing-card">
              <span className="badge">Facturation</span>
              <p>
                <strong>{address.full_name}</strong>
              </p>
              <p>{address.street_and_number}</p>
              <p>
                {address.postal_code} {address.city}
              </p>
              <p>{address.country}</p>
            </div>
          )}

          {error && <div className="alert-warning">{error}</div>}
        </div>

        <div className="order-summary-box">
          <div className="summary-row">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)} DH</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{subtotal.toFixed(2)} DH</span>
          </div>

          <button
            className="btn-primary full-width"
            onClick={handleConfirm}
            disabled={placing}
          >
            {placing ? "..." : "PAYER MAINTENANT"}
          </button>
        </div>
      </div>
    </div>
  );
}
