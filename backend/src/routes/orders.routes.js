// ============================================================
// Routes : Orders (Commandes)
// Toutes ces routes nécessitent une connexion (requireAuth).
// ============================================================

const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin");

router.use(requireAuth);

// GET /api/orders -> mes commandes ("Vos commandes")
router.get("/", ordersController.listOrders);

// ---------- Routes réservées à l'administration ----------
router.get("/admin/all", requireAdmin, ordersController.listAllOrdersAdmin);
router.patch("/admin/:id/status", requireAdmin, ordersController.updateStatusAdmin);

// GET /api/orders/:id -> détail d'une commande
router.get("/:id", ordersController.getOrder);

// POST /api/orders/checkout -> transformer le panier en commande
router.post("/checkout", ordersController.checkout);

// PATCH /api/orders/:id/cancel -> annuler une commande
router.patch("/:id/cancel", ordersController.cancelOrder);

module.exports = router;
