// ============================================================
// Routes : Categories
// Définit les adresses (URL) accessibles pour les catégories.
// ============================================================

const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin");

// GET /api/categories -> liste toutes les catégories
router.get("/", categoriesController.listCategories);

// GET /api/categories/:id -> une catégorie précise
router.get("/:id", categoriesController.getCategory);

// ---------- Routes réservées à l'administration ----------
router.post("/", requireAuth, requireAdmin, categoriesController.createCategory);
router.patch("/:id", requireAuth, requireAdmin, categoriesController.updateCategory);
router.delete("/:id", requireAuth, requireAdmin, categoriesController.deleteCategory);

module.exports = router;
