// ============================================================
// pages/VisitDateTime.jsx — Étape 1 : Date + Heure
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AVAILABLE_TIMES = ["07:00", "09:00", "11:00", "14:00"];

export default function VisitDateTime() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("07:00");

  function handleContinue() {
    if (!date) return;
    sessionStorage.setItem("visit_date", date);
    sessionStorage.setItem("visit_time", time);
    navigate("/rendez-vous/details");
  }

  return (
    <div className="page-visit-datetime container">
      <div className="checkout-layout">
        <div>
          <h1>Visite guidée de la mine de Bou-Azzer</h1>

          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <label>Pick a Time</label>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            {AVAILABLE_TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <button className="btn-primary" onClick={handleContinue} disabled={!date}>
            CONTINUE
          </button>
        </div>

        <div className="visit-info-box">
          <p>📍 Mine de Bou-Azzer</p>
          <p>🕒 9 heures</p>
          <p>
            ℹ️ Bienvenue à la mine de Bou-Azzer. Organisez votre visite guidée
            et découvrez l'univers minier de Bou-Azzer. Les visites sont
            réservées aux entreprises, établissements scolaires, instituts,
            facultés et colonies de vacances.
          </p>
          <p>
            <strong>Important :</strong> pour des raisons de sécurité liées
            aux conditions de visite de la mine, l'accès est déconseillé aux
            personnes à mobilité réduite ainsi qu'aux personnes souffrant de
            certaines maladies chroniques.
          </p>
        </div>
      </div>
    </div>
  );
}
