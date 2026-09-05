// ============================================================
// Routes : Visits (Rendez-vous)
// La création d'un rendez-vous est ouverte aux visiteurs non
// connectés (optionalAuth), mais consulter "mes rendez-vous"
// nécessite une connexion (requireAuth).
// ============================================================

const express = require("express");
const router = express.Router();
const visitsController = require("../controllers/visits.controller");
const { requireAuth, optionalAuth } = require("../middleware/auth.middleware");

// GET /api/visits/mine -> mes rendez-vous (connexion requise)
router.get("/mine", requireAuth, visitsController.listMyVisits);

// POST /api/visits -> réserver une visite (connexion optionnelle)
router.post("/", optionalAuth, visitsController.createVisit);

// PATCH /api/visits/:id/reschedule -> "Replanifier"
router.patch("/:id/reschedule", visitsController.rescheduleVisit);

// PATCH /api/visits/:id/cancel -> "Annuler"
router.patch("/:id/cancel", visitsController.cancelVisit);

module.exports = router;
