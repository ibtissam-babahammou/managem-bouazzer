// ============================================================
// Routes : Addresses
// Toutes ces routes nécessitent une connexion (requireAuth),
// car une adresse appartient toujours à un utilisateur précis.
// ============================================================

const express = require("express");
const router = express.Router();
const addressesController = require("../controllers/addresses.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.use(requireAuth);

// GET /api/addresses -> mes adresses enregistrées
router.get("/", addressesController.listAddresses);

// POST /api/addresses -> ajouter une nouvelle adresse
router.post("/", addressesController.createAddress);

// PATCH /api/addresses/:id -> modifier une adresse
router.patch("/:id", addressesController.updateAddress);

// DELETE /api/addresses/:id -> supprimer une adresse
router.delete("/:id", addressesController.removeAddress);

module.exports = router;
