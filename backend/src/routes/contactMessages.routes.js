// ============================================================
// Routes : Contact Messages
// ============================================================

const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactMessages.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin");

// POST /api/contact -> envoyer un message (ouvert à tous)
router.post("/", contactController.sendMessage);

// GET /api/contact -> lister les messages (réservé au personnel)
router.get("/", requireAuth, requireAdmin, contactController.listMessages);

module.exports = router;
