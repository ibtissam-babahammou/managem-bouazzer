// ============================================================
// Routes : Auth (inscription / connexion)
// ============================================================

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// POST /api/auth/register -> créer un compte
router.post("/register", authController.register);

// POST /api/auth/login -> se connecter
router.post("/login", authController.login);

module.exports = router;
