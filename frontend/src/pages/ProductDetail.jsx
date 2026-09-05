// ============================================================
// pages/ProductDetail.jsx
// ============================================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/client";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiClient.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  async function handleAddToCart() {
    await addToCart(product.id, quantity);
    setMessage("Produit ajouté au panier !");
  }

  async function handleAddToWishlist() {
    if (!user) {
      setMessage("Connectez-vous pour ajouter à votre liste de souhaits.");
      return;
    }
    await apiClient.post("/wishlist", { productId: product.id });
    setMessage("Ajouté à la liste de souhaits !");
  }

  if (!product) return <p className="container">Chargement...</p>;

  const outOfStock = product.stock_quantity <= 0;

  return (
    <div className="page-product-detail container">
      <div className="product-image-large">
        {product.image_url && <img src={product.image_url} alt={product.name} />}
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        {product.ruban && product.ruban !== "Normal" && (
          <span className={`badge badge-${product.ruban.toLowerCase()}`}>
            {product.ruban}
          </span>
        )}
        <p className="price">{Number(product.price).toFixed(2)} DH</p>

        {product.description && <p className="description">{product.description}</p>}

        <ul className="product-specs">
          {product.weight && <li>Poids : {product.weight}</li>}
          {product.dimensions && <li>Dimensions : {product.dimensions}</li>}
        </ul>

        <div className="quantity-selector">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        <button
          className="btn-primary"
          onClick={handleAddToCart}
          disabled={outOfStock}
        >
          🛒 {outOfStock ? "RUPTURE DE STOCK" : "AJOUTER AU PANIER"}
        </button>

        <button className="btn-secondary" onClick={handleAddToWishlist}>
          ♡ Ajouter à la liste de souhaits
        </button>

        {message && <p className="info-message">{message}</p>}

        <div className="product-terms">
          <a href="/conditions-generales">Conditions générales</a>
          <p>Garantie satisfait ou remboursé de 30 jours</p>
          <p>Livraison : 2 à 3 jours ouvrables</p>
        </div>
      </div>
    </div>
  );
}
