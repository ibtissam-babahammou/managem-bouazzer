// ============================================================
// Contrôleur : Cart (Panier)
// ============================================================

const cartModel = require("../models/cart.model");

async function viewCart(req, res) {
  try {
    const items = await cartModel.getCartItems(req.cartOwner);
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
    res.json({ items, subtotal, total: subtotal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération du panier." });
  }
}

async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Produit ou quantité invalide." });
    }

    const item = await cartModel.addItem(req.cartOwner, productId, quantity);
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout au panier." });
  }
}

async function updateQuantity(req, res) {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantité invalide." });
    }
    const updated = await cartModel.updateItemQuantity(
      req.params.itemId,
      quantity
    );
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du panier." });
  }
}

async function removeFromCart(req, res) {
  try {
    await cartModel.removeItem(req.params.itemId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'article." });
  }
}

module.exports = {
  viewCart,
  addToCart,
  updateQuantity,
  removeFromCart,
};
