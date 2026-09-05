// ============================================================
// pages/VisitConfirmation.jsx — Étape 3 : Confirmed!
// ============================================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/client";

export default function VisitConfirmation() {
  const { id } = useParams();
  const [visit, setVisit] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Nécessite une connexion pour être retrouvé via "mine" ;
    // pour un visiteur non connecté, la confirmation reste
    // affichée grâce aux données déjà reçues lors de la création.
    apiClient
      .get("/visits/mine")
      .then((res) => {
        const found = res.data.find((v) => v.id === id);
        if (found) setVisit(found);
      })
      .catch(() => setError(""));
  }, [id]);

  async function handleCancel() {
    await apiClient.patch(`/visits/${id}/cancel`);
    setVisit((v) => ({ ...v, status: "annulee" }));
  }

  if (!visit) {
    return (
      <div className="page-visit-confirmation container">
        <h1>Confirmed! ✅</h1>
        <p>Merci pour votre demande de réservation. Notre équipe vous contactera pour confirmer les détails de votre visite.</p>
      </div>
    );
  }

  return (
    <div className="page-visit-confirmation container">
      <h1>Confirmed! ✅</h1>
      <h2>Visite guidée de la mine de Bou-Azzer</h2>

      <p>📅 {visit.visit_date} ({visit.visit_time})</p>
      <p>📍 Mine de Bou-Azzer</p>
      <p>{visit.full_name}</p>
      <p>{visit.email}</p>
      <p>{visit.phone}</p>

      <p>
        Merci pour votre demande de réservation. Nous avons bien reçu votre
        demande de visite de la mine de Bou-Azzer. Notre équipe vous
        contactera pour confirmer les détails de votre visite.
      </p>

      <div className="visit-details-box">
        <h3>Vos coordonnées</h3>
        <p>Nom de l'établissement/entreprise - {visit.organization_name}</p>
        <p>Type d'organisation - {visit.organization_type}</p>
        <p>Nombre de participants - {visit.participants_count}</p>
        <p>Responsable du groupe - {visit.group_leader_name}</p>
        <p>Statut - {visit.status}</p>
      </div>

      {visit.status !== "annulee" && (
        <button className="btn-secondary" onClick={handleCancel}>
          Annuler
        </button>
      )}
    </div>
  );
}
