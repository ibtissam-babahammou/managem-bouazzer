// ============================================================
// pages/admin/AdminFaq.jsx
// ============================================================

import { useEffect, useState } from "react";
import apiClient from "../../api/client";

const EMPTY_FORM = { id: null, question: "", answer: "", displayOrder: 0 };

export default function AdminFaq() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  function load() {
    apiClient.get("/faqs").then((res) => setFaqs(res.data));
  }

  useEffect(load, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.id) {
      await apiClient.patch(`/faqs/${form.id}`, form);
    } else {
      await apiClient.post("/faqs", form);
    }
    setShowForm(false);
    setForm(EMPTY_FORM);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette question ?")) return;
    await apiClient.delete(`/faqs/${id}`);
    load();
  }

  return (
    <div className="admin-faq">
      <div className="admin-page-header">
        <h1>Questions fréquentes</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setForm(EMPTY_FORM);
            setShowForm(true);
          }}
        >
          + Nouvelle question
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <label>Question *</label>
          <input
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            required
          />

          <label>Réponse *</label>
          <textarea
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            required
          />

          <label>Ordre d'affichage</label>
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => setForm({ ...form, displayOrder: e.target.value })}
          />

          <div className="admin-form-actions">
            <button type="submit" className="btn-primary">
              Enregistrer
            </button>
            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
              Annuler
            </button>
          </div>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((f) => (
            <tr key={f.id}>
              <td>{f.question}</td>
              <td>
                <button
                  onClick={() => {
                    setForm({
                      id: f.id,
                      question: f.question,
                      answer: f.answer,
                      displayOrder: f.display_order,
                    });
                    setShowForm(true);
                  }}
                >
                  Modifier
                </button>
                <button onClick={() => handleDelete(f.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
