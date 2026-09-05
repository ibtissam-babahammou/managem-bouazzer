// ============================================================
// pages/Register.jsx
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await register(form.fullName, form.email, form.phone, form.password);
      navigate("/mon-compte");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création du compte.");
    }
  }

  return (
    <div className="page-register container">
      <h1>Créer un compte</h1>

      <form onSubmit={handleSubmit} className="simple-form">
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

        <label>Téléphone *</label>
        <input name="phone" value={form.phone} onChange={handleChange} required />

        <label>Mot de passe *</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <button type="submit" className="btn-primary full-width">
          CRÉER MON COMPTE
        </button>
      </form>

      <p>
        Déjà un compte ? <Link to="/connexion">Se connecter</Link>
      </p>
    </div>
  );
}
