// ============================================================
// Routes : FAQ
// ============================================================

const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");

// GET /api/faqs -> liste des questions fréquentes (Contactez-nous)
router.get("/", faqController.listFaqs);

module.exports = router;
