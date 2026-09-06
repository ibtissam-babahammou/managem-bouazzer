// ============================================================
// pages/admin/AdminProducts.jsx
// ============================================================

import { useEffect, useState } from "react";
import apiClient from "../../api/client";
import ImageUploader from "../../components/ImageUploader";

const EMPTY_FORM = {
  id: null,
  category_id: "",
  name: "",
  description: "",
  price: "",
  image_url: "",
  weight: "",
  dimensions: "",
  ruban: "Normal",
  is_published: true,
  initial_stock: 0,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  function loadProducts() {
    apiClient.get("/products/admin/all").then((res) => setProducts(res.data));
  }

  useEffect(() => {
    loadProducts();
    apiClient.get("/categories").then((res) => setCategories(res.data));
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function startEdit(product) {
    setForm({
      id: product.id,
      category_id: product.category_id || "",
      name: product.name,
      description: product.description || "",
      price: product.price,
      image_url: product.image_url || "",
      weight: product.weight || "",
      dimensions: product.dimensions || "",
      ruban: product.ruban,
      is_published: product.is_published,
      initial_stock: product.stock_quantity || 0,
    });
    setShowForm(true);
  }

  function startCreate() {
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.id) {
      await apiClient.patch(`/products/${form.id}`, form);
    } else {
      await apiClient.post("/products", form);
    }
    setShowForm(false);
    loadProducts();
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer ce produit ?")) return;
    await apiClient.delete(`/products/${id}`);
    loadProducts();
  }

  return (
    <div className="admin-products">
      <div className="admin-page-header">
        <h1>Produits</h1>
        <button className="btn-primary" onClick={startCreate}>
          + Nouveau produit
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>{form.id ? "Modifier le produit" : "Nouveau produit"}</h2>

          <label>Nom *</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Catégorie</label>
          <select name="category_id" value={form.category_id} onChange={handleChange}>
            <option value="">— Aucune —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />

          <div className="form-row">
            <div>
              <label>Prix (DH) *</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Ruban</label>
              <select name="ruban" value={form.ruban} onChange={handleChange}>
                <option value="Normal">Normal</option>
                <option value="Nouveau">Nouveau</option>
                <option value="Rare">Rare</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Poids</label>
              <input name="weight" value={form.weight} onChange={handleChange} placeholder="ex: 12g" />
            </div>
            <div>
              <label>Dimensions</label>
              <input
                name="dimensions"
                value={form.dimensions}
                onChange={handleChange}
                placeholder="ex: 4cm x 2cm"
              />
            </div>
          </div>

          {!form.id && (
            <>
              <label>Stock initial</label>
              <input
                type="number"
                name="initial_stock"
                value={form.initial_stock}
                onChange={handleChange}
              />
            </>
          )}

          <label>Image</label>
          <ImageUploader
            currentUrl={form.image_url}
            onUploaded={(url) => setForm({ ...form, image_url: url })}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="is_published"
              checked={form.is_published}
              onChange={handleChange}
            />
            Publié (visible sur la boutique)
          </label>

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
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category_name || "—"}</td>
              <td>{Number(p.price).toFixed(2)} DH</td>
              <td>{p.stock_quantity}</td>
              <td>{p.is_published ? "Publié" : "Non publié"}</td>
              <td>
                <button onClick={() => startEdit(p)}>Modifier</button>
                <button onClick={() => handleDelete(p.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
