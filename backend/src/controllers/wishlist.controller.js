// ============================================================
// Contrôleur : Wishlist
// ============================================================

const wishlistModel = require("../models/wishlist.model");

async function listWishlist(req, res) {
  try {
    const items = await wishlistModel.getWishlistByUser(req.user.id);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération de la liste de souhaits." });
  }
}

async function addItem(req, res) {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Produit requis." });
    }
    const item = await wishlistModel.addToWishlist(req.user.id, productId);
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout à la liste de souhaits." });
  }
}

async function removeItem(req, res) {
  try {
    await wishlistModel.removeFromWishlist(req.user.id, req.params.productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
}

module.exports = { listWishlist, addItem, removeItem };
