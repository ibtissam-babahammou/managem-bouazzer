// ============================================================
// Routes : Wishlist
// Toutes ces routes nécessitent une connexion (requireAuth).
// ============================================================

const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.use(requireAuth);

// GET /api/wishlist -> ma liste de souhaits
router.get("/", wishlistController.listWishlist);

// POST /api/wishlist -> ajouter un produit
router.post("/", wishlistController.addItem);

// DELETE /api/wishlist/:productId -> retirer un produit
router.delete("/:productId", wishlistController.removeItem);

module.exports = router;
