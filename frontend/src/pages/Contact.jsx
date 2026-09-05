// ============================================================
// pages/Contact.jsx — Formulaire + FAQ
// ============================================================

import { useState, useEffect } from "react";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.full_name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    companyName: "",
    subject: "",
    message: "",
  });
  const [faqs, setFaqs] = useState([]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient.get("/faqs").then((res) => setFaqs(res.data));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await apiClient.post("/contact", form);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'envoi du message.");
    }
  }

  return (
    <div className="page-contact container">
      <div className="checkout-layout">
        <div>
          <h1>Contactez-nous</h1>
          <p>Contactez-nous pour toute question concernant notre entreprise ou nos services.</p>

          {sent ? (
            <p className="info-message">
              Merci ! Votre message a bien été envoyé. Nous répondons
              généralement sous 1 à 2 jours ouvrables.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="simple-form">
              {error && <div className="alert-warning">{error}</div>}

              <div className="form-row">
                <div>
                  <label>Nom *</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} required />
                </div>
                <div>
                  <label>Numéro de téléphone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required />
                </div>
              </div>

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
                  <label>Société *</label>
                  <input
                    name="companyName"
                    placeholder="Nom de votre entreprise"
                    value={form.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label>Sujet *</label>
              <input
                name="subject"
                placeholder="Décrivez votre demande"
                value={form.subject}
                onChange={handleChange}
                required
              />

              <label>Message *</label>
              <textarea
                name="message"
                placeholder="Écrivez votre message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                required
              />

              <p className="hint">Nous répondons généralement sous 1 à 2 jours ouvrables.</p>

              <button type="submit" className="btn-primary">
                ENVOYER MESSAGE
              </button>
            </form>
          )}
        </div>

        <div className="contact-image-placeholder" />
      </div>

      <section className="faq-section">
        <h2>Besoin d'aide ?</h2>
        <p>Dans cette section, vous pouvez répondre efficacement aux questions les plus fréquentes.</p>

        <div className="faq-grid">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
