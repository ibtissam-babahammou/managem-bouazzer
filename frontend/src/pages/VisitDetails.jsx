// ============================================================
// pages/VisitDetails.jsx — Étape 2 : Your details
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function VisitDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    organizationName: "",
    organizationType: "Entreprise",
    participantsCount: 10,
    groupLeaderName: "",
  });
  const [error, setError] = useState("");

  const visitDate = sessionStorage.getItem("visit_date");
  const visitTime = sessionStorage.getItem("visit_time");

  useEffect(() => {
    if (!visitDate || !visitTime) {
      navigate("/rendez-vous");
    }
  }, [visitDate, visitTime, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await apiClient.post("/visits", {
        ...form,
        visitDate,
        visitTime,
      });
      sessionStorage.removeItem("visit_date");
      sessionStorage.removeItem("visit_time");
      navigate(`/rendez-vous/confirmation/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la réservation.");
    }
  }

  return (
    <div className="page-visit-details container">
      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="simple-form">
          <h1>Your details</h1>
          {error && <div className="alert-warning">{error}</div>}

          <label>Nom complet *</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required />

          <label>E-mail *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Numéro de téléphone *</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />

          <label>Nom de l'établissement / entreprise *</label>
          <input
            name="organizationName"
            value={form.organizationName}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <div>
              <label>Type d'organisation *</label>
              <select
                name="organizationType"
                value={form.organizationType}
                onChange={handleChange}
              >
                <option value="Entreprise">Entreprise</option>
                <option value="École">École</option>
                <option value="Institut">Institut</option>
                <option value="Université">Université</option>
                <option value="Colonie de vacances">Colonie de vacances</option>
              </select>
            </div>
            <div>
              <label>Nombre de participants *</label>
              <input
                type="number"
                min="1"
                name="participantsCount"
                value={form.participantsCount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Nom et prénom du responsable du groupe *</label>
          <input
            name="groupLeaderName"
            value={form.groupLeaderName}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary full-width">
            CONFIRMER LE RENDEZ-VOUS
          </button>
        </form>

        <div className="visit-info-box">
          <p>📅 {visitDate} - {visitTime}</p>
          <p>📍 Mine de Bou-Azzer</p>
          <p>🕒 9 heures</p>
        </div>
      </div>
    </div>
  );
}
