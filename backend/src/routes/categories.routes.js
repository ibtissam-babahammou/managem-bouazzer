// ============================================================
// Routes : Categories
// Définit les adresses (URL) accessibles pour les catégories.
// ============================================================

const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.controller");

// GET /api/categories -> liste toutes les catégories
router.get("/", categoriesController.listCategories);

// GET /api/categories/:id -> une catégorie précise
router.get("/:id", categoriesController.getCategory);

module.exports = router;
