// ============================================================
// pages/Login.jsx
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/mon-compte");
    } catch (err) {
      setError(err.response?.data?.message || "E-mail ou mot de passe incorrect.");
    }
  }

  return (
    <div className="page-login container">
      <h1>Se connecter</h1>

      <form onSubmit={handleSubmit} className="simple-form">
        {error && <div className="alert-warning">{error}</div>}

        <label>E-mail *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mot de passe *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary full-width">
          SE CONNECTER
        </button>
      </form>

      <p>
        Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
      </p>
    </div>
  );
}
