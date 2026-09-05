// ============================================================
// components/Header.jsx
// En-tête commun à toutes les pages du site.
// ============================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const { user, logout } = useAuth();
  const { itemsCount } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            MANAGEM
          </Link>

          <nav className="main-nav">
            <Link to="/">Accueil</Link>
            <Link to="/boutique">Boutique</Link>
            <Link to="/rendez-vous">Rendez-vous</Link>
            <Link to="/a-propos">À propos</Link>
          </nav>

          <div className="header-actions">
            <Link to="/panier" className="icon-btn cart-icon">
              🛒
              {itemsCount > 0 && <span className="cart-badge">{itemsCount}</span>}
            </Link>

            <button className="icon-btn" onClick={() => setShowSearch(true)}>
              🔍
            </button>

            <a href="tel:+212647846943" className="phone-link">
              📞 +212 647846943
            </a>

            {user ? (
              <div className="account-menu-wrapper">
                <button
                  className="account-btn"
                  onClick={() => setShowAccountMenu((v) => !v)}
                >
                  {user.full_name} ▾
                </button>
                {showAccountMenu && (
                  <div className="account-dropdown">
                    <Link to="/mon-compte" onClick={() => setShowAccountMenu(false)}>
                      📇 Mon compte
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowAccountMenu(false);
                      }}
                    >
                      ⏻ Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/connexion" className="account-btn">
                Se connecter
              </Link>
            )}

            <Link to="/contact" className="btn-primary contact-btn">
              CONTACTEZ-NOUS
            </Link>
          </div>
        </div>
      </header>

      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
    </>
  );
}
