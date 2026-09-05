// ============================================================
// Routes : Products
// ============================================================

const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

// GET /api/products -> liste tous les produits (avec filtres optionnels)
router.get("/", productsController.listProducts);

// GET /api/products/:id -> un produit précis (page produit)
router.get("/:id", productsController.getProduct);

module.exports = router;
