// ============================================================
// pages/Panier.jsx — Étape 1 : Résumé de la commande
// ============================================================

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutBreadcrumb from "../components/CheckoutBreadcrumb";

export default function Panier() {
  const { items, subtotal, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  if (loading) return <p className="container">Chargement...</p>;

  return (
    <div className="page-panier container">
      <CheckoutBreadcrumb step={0} />
      <h1>Résumé de la commande</h1>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="cart-icon-large">🛒</div>
          <p>Votre panier est vide !</p>
          <Link to="/boutique" className="btn-primary">
            BOUTIQUE
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-image">
                  {item.image_url && <img src={item.image_url} alt={item.name} />}
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
                </div>
                <div>{Number(item.price).toFixed(2)} DH</div>
                <div>{item.quantity}</div>
              </div>
            ))}
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

            <div className="discount-code">
              <input type="text" placeholder="Code de remise..." />
              <button>Appliquer</button>
            </div>

            <button
              className="btn-primary full-width"
              onClick={() => navigate("/commande/adresse")}
            >
              PAYER ›
            </button>

            <Link to="/boutique" className="link-back">
              ‹ Continuer vos achats
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
