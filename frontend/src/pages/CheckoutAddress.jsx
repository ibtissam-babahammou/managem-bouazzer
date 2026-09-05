// ============================================================
// pages/CheckoutAddress.jsx — Étape 2 : Modifier l'adresse
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CheckoutBreadcrumb from "../components/CheckoutBreadcrumb";

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  taxNumber: "",
  streetAndNumber: "",
  apartment: "",
  city: "",
  postalCode: "",
  country: "",
};

export default function CheckoutAddress() {
  const { user } = useAuth();
  const { subtotal } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await apiClient.post("/addresses", form);
      // On garde l'adresse choisie pour l'étape suivante (Paiement)
      sessionStorage.setItem("checkout_address_id", res.data.id);
      navigate("/commande/paiement");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Votre adresse de facturation semble incomplète ou invalide."
      );
    }
  }

  return (
    <div className="page-checkout-address container">
      <CheckoutBreadcrumb step={1} />

      {error && <div className="alert-warning">{error}</div>}

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="address-form">
          <h1>Modifier l'adresse</h1>

          <label>Votre nom *</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required />

          <div className="form-row">
            <div>
              <label>E-mail *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Téléphone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Nom de la société</label>
              <input name="companyName" value={form.companyName} onChange={handleChange} />
            </div>
            <div>
              <label>TVA</label>
              <input name="taxNumber" value={form.taxNumber} onChange={handleChange} />
            </div>
          </div>

          <label>Rue et numéro *</label>
          <input
            name="streetAndNumber"
            value={form.streetAndNumber}
            onChange={handleChange}
            required
          />

          <label>Appartement, suite, etc.</label>
          <input name="apartment" value={form.apartment} onChange={handleChange} />

          <div className="form-row">
            <div>
              <label>Ville *</label>
              <input name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div>
              <label>Code postal *</label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Pays *</label>
          <select name="country" value={form.country} onChange={handleChange} required>
            <option value="">Pays...</option>
            <option value="Maroc">Maroc</option>
            <option value="France">France</option>
            <option value="Espagne">Espagne</option>
          </select>

          <button type="submit" className="btn-primary full-width">
            CONFIRMER ›
          </button>
        </form>

        <div className="order-summary-box">
          <div className="summary-row total">
            <span>Total</span>
            <span>{subtotal.toFixed(2)} DH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
