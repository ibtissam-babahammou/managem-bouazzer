// ============================================================
// pages/admin/AdminCategories.jsx
// ============================================================

import { useEffect, useState } from "react";
import apiClient from "../../api/client";
import ImageUploader from "../../components/ImageUploader";

const EMPTY_FORM = { id: null, name: "", description: "", icon_url: "" };

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  function loadCategories() {
    apiClient.get("/categories").then((res) => setCategories(res.data));
  }

  useEffect(loadCategories, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.id) {
      await apiClient.patch(`/categories/${form.id}`, form);
    } else {
      await apiClient.post("/categories", form);
    }
    setShowForm(false);
    setForm(EMPTY_FORM);
    loadCategories();
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette catégorie ?")) return;
    await apiClient.delete(`/categories/${id}`);
    loadCategories();
  }

  return (
    <div className="admin-categories">
      <div className="admin-page-header">
        <h1>Catégories</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setForm(EMPTY_FORM);
            setShowForm(true);
          }}
        >
          + Nouvelle catégorie
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>{form.id ? "Modifier la catégorie" : "Nouvelle catégorie"}</h2>

          <label>Nom *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <label>Icône / image</label>
          <ImageUploader
            currentUrl={form.icon_url}
            onUploaded={(url) => setForm({ ...form, icon_url: url })}
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
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <button
                  onClick={() => {
                    setForm(c);
                    setShowForm(true);
                  }}
                >
                  Modifier
                </button>
                <button onClick={() => handleDelete(c.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
