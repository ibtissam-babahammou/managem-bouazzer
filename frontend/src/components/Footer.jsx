// ============================================================
// components/Footer.jsx
// Pied de page commun à toutes les pages du site.
// Chaque lien est fonctionnel, comme demandé.
// ============================================================

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <h4>Liens utiles</h4>
          <Link to="/">Accueil</Link>
          <Link to="/a-propos">À propos</Link>
          <Link to="/boutique">Produits</Link>
          <Link to="/politique-vie-privee">Politique vie privée</Link>
          <Link to="/contact">Contactez-nous</Link>
        </div>

        <div>
          <h4>À propos</h4>
          <p>
            Bou-Azzer Minerals valorise la richesse minérale de Bou-Azzer à
            travers la découverte de ses ressources et l'organisation de
            visites guidées du site minier. Nous partageons notre savoir-faire
            et notre passion pour les minéraux dans un cadre professionnel,
            éducatif et sécurisé.
          </p>
        </div>

        <div>
          <h4>Découvrez-nous</h4>
          <Link to="/contact">💬 Contactez-nous</Link>
          <a href="mailto:contact@minesetpierres.fr">✉️ contact@minesetpierres.fr</a>
          <a href="tel:+212647846943">📞 +212 647-846943</a>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              X
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>Copyright © Bou-Azzer Minerals</p>
      </div>
    </footer>
  );
}
