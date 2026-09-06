// ============================================================
// Routes : Inventory (réservé au personnel autorisé)
// ============================================================

const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin");

router.use(requireAuth, requireAdmin);

// GET /api/inventory -> l'état complet du stock
router.get("/", inventoryController.listInventory);

// PATCH /api/inventory/:productId -> ajuster la quantité d'un produit
router.patch("/:productId", inventoryController.updateInventory);

module.exports = router;
