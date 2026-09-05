// ============================================================
// pages/Boutique.jsx
// ============================================================

import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import apiClient from "../api/client";

export default function Boutique() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryId = searchParams.get("categoryId") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    apiClient.get("/categories").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (categoryId) params.categoryId = categoryId;
    if (search) params.search = search;

    apiClient
      .get("/products", { params })
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [categoryId, search]);

  function selectCategory(id) {
    const params = {};
    if (id) params.categoryId = id;
    setSearchParams(params);
  }

  return (
    <div className="page-boutique container">
      <h1>Tous les produits</h1>

      <div className="category-filters">
        <button
          className={!categoryId ? "active" : ""}
          onClick={() => selectCategory("")}
        >
          Toutes
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={categoryId === cat.id ? "active" : ""}
            onClick={() => selectCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="search-sort-bar">
        <input
          type="text"
          placeholder="Search..."
          defaultValue={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchParams({
                ...(categoryId && { categoryId }),
                search: e.target.value,
              });
            }
          }}
        />
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/produit/${product.id}`}
              className="product-card"
            >
              {product.ruban && product.ruban !== "Normal" && (
                <span className={`badge badge-${product.ruban.toLowerCase()}`}>
                  {product.ruban}
                </span>
              )}
              <div className="product-image-placeholder">
                {product.image_url && <img src={product.image_url} alt={product.name} />}
              </div>
              <h3>{product.name}</h3>
              <p>{Number(product.price).toFixed(2)} DH</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
