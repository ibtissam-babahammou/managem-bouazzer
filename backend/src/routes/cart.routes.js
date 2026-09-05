// ============================================================
// Routes : Cart (Panier)
// Toutes ces routes passent d'abord par "identifyCartOwner"
// pour savoir à qui appartient le panier.
// ============================================================

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const identifyCartOwner = require("../middleware/identifyCartOwner");
const { optionalAuth } = require("../middleware/auth.middleware");

router.use(optionalAuth);
router.use(identifyCartOwner);

// GET /api/cart -> voir le contenu du panier
router.get("/", cartController.viewCart);

// POST /api/cart -> ajouter un produit au panier
router.post("/", cartController.addToCart);

// PATCH /api/cart/:itemId -> modifier la quantité d'un article
router.patch("/:itemId", cartController.updateQuantity);

// DELETE /api/cart/:itemId -> supprimer un article du panier
router.delete("/:itemId", cartController.removeFromCart);

module.exports = router;
