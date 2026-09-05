// ============================================================
// context/CartContext.jsx
// Garde en mémoire, dans toute l'application, le contenu du
// panier (pour afficher le compteur dans le Header, etc.).
// ============================================================

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import apiClient from "../api/client";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const refreshCart = useCallback(async () => {
    try {
      const res = await apiClient.get("/cart");
      setItems(res.data.items);
      setSubtotal(res.data.subtotal);
    } catch (error) {
      console.error("Erreur lors du chargement du panier :", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  async function addToCart(productId, quantity = 1) {
    await apiClient.post("/cart", { productId, quantity });
    await refreshCart();
  }

  async function updateQuantity(itemId, quantity) {
    await apiClient.patch(`/cart/${itemId}`, { quantity });
    await refreshCart();
  }

  async function removeFromCart(itemId) {
    await apiClient.delete(`/cart/${itemId}`);
    await refreshCart();
  }

  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
        itemsCount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
