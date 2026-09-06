// ============================================================
// Routes : Products
// ============================================================

const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin");

// GET /api/products -> liste tous les produits (avec filtres optionnels)
router.get("/", productsController.listProducts);

// GET /api/products/:id -> un produit précis (page produit)
router.get("/:id", productsController.getProduct);

// ---------- Routes réservées à l'administration ----------
router.get("/admin/all", requireAuth, requireAdmin, productsController.listProductsAdmin);
router.post("/", requireAuth, requireAdmin, productsController.createProduct);
router.patch("/:id", requireAuth, requireAdmin, productsController.updateProduct);
router.delete("/:id", requireAuth, requireAdmin, productsController.deleteProduct);

module.exports = router;
