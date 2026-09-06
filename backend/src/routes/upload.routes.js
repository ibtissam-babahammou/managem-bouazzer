// ============================================================
// Routes : Upload d'images (réservé au personnel autorisé)
// ============================================================

const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller");
const upload = require("../middleware/upload");
const { requireAuth } = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin");

// POST /api/upload -> envoie une image, reçoit son URL en retour
router.post(
  "/",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  uploadController.uploadImage
);

module.exports = router;
