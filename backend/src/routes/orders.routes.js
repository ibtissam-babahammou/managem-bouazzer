// ============================================================
// Routes : Orders (Commandes)
// Toutes ces routes nécessitent une connexion (requireAuth).
// ============================================================

const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.use(requireAuth);

// GET /api/orders -> mes commandes ("Vos commandes")
router.get("/", ordersController.listOrders);

// GET /api/orders/:id -> détail d'une commande
router.get("/:id", ordersController.getOrder);

// POST /api/orders/checkout -> transformer le panier en commande
router.post("/checkout", ordersController.checkout);

// PATCH /api/orders/:id/cancel -> annuler une commande
router.patch("/:id/cancel", ordersController.cancelOrder);

module.exports = router;
