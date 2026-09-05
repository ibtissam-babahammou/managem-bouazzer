// ============================================================
// Routes : Users (profil "Mon compte")
// Toutes ces routes nécessitent une connexion (requireAuth).
// ============================================================

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.use(requireAuth);

// GET /api/users/me -> voir mon profil
router.get("/me", usersController.getProfile);

// PATCH /api/users/me -> modifier mon profil
router.patch("/me", usersController.updateProfile);

module.exports = router;
