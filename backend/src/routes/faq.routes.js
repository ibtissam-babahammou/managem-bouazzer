// ============================================================
// Routes : FAQ
// ============================================================

const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/requireAdmin");

// GET /api/faqs -> liste des questions fréquentes (Contactez-nous)
router.get("/", faqController.listFaqs);

// ---------- Routes réservées à l'administration ----------
router.post("/", requireAuth, requireAdmin, faqController.addFaq);
router.patch("/:id", requireAuth, requireAdmin, faqController.editFaq);
router.delete("/:id", requireAuth, requireAdmin, faqController.removeFaq);

module.exports = router;
