// ============================================================
// Contrôleur : Inventory (Inventaire) — réservé au personnel
// ============================================================

const inventoryModel = require("../models/inventory.model");

async function listInventory(req, res) {
  try {
    const inventory = await inventoryModel.getAllInventory();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'inventaire." });
  }
}

async function updateInventory(req, res) {
  try {
    const { quantity } = req.body;
    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ message: "Quantité invalide." });
    }
    const updated = await inventoryModel.setQuantity(req.params.productId, quantity);
    if (!updated) {
      return res.status(404).json({ message: "Produit introuvable dans l'inventaire." });
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du stock." });
  }
}

module.exports = { listInventory, updateInventory };
