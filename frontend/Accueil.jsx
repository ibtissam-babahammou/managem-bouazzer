// ============================================================
// pages/Accueil.jsx — Page d'accueil
// ============================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/client";

export default function Accueil() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page-accueil">
      {/* Hero */}
      <section className="hero container">
        <div>
          <h1>L'excellence minérale de Bou-Azzer</h1>
          <p>
            Découvrez des minéraux d'exception issus de Bou-Azzer, et vivez
            une expérience unique au cœur de nos mines.
          </p>
        </div>
        <Link to="/rendez-vous" className="btn-primary">
          RÉSERVEZ UNE VISITE
        </Link>
      </section>

      {/* Grille des catégories */}
      <section className="categories-grid container">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/boutique?categoryId=${cat.id}`}
            className="category-card"
          >
            {cat.icon_url && (
              <img src={cat.icon_url} alt={cat.name} className="category-card-image" />
            )}
            <span>{cat.name}</span>
          </Link>
        ))}
      </section>

      {/* Indicateurs clés */}
      <section className="stats-section container">
        <div>
          <h2>Indicateurs clés de notre activité</h2>
          <p>
            De la découverte des gisements à la fidélisation des visiteurs,
            nos indicateurs clés valorisent nos visites de mine et nos ventes
            de minéraux.
          </p>
        </div>
        <div className="stats-grid">
          <div>
            <strong>15%</strong>
            <span>de croissance des ventes</span>
          </div>
          <div>
            <strong>100 000</strong>
            <span>de visiteurs curieux</span>
          </div>
          <div>
            <strong>50M €</strong>
            <span>de ventes attendues</span>
          </div>
          <div>
            <strong>20+</strong>
            <span>de visites organisées</span>
          </div>
          <div>
            <strong>85%</strong>
            <span>de visiteurs satisfaits</span>
          </div>
          <div>
            <strong>4x</strong>
            <span>les visites de mine</span>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="cta-section container">
        <div>
          <h2>Envie d'en savoir plus ? Contactez-nous, c'est offert</h2>
          <p>Prenez rendez-vous et vivez l'expérience unique de nos mines.</p>
          <Link to="/rendez-vous" className="btn-secondary">
            RÉSERVER UNE VISITE
          </Link>
        </div>
      </section>
    </div>
  );
}
