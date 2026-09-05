// ============================================================
// Contrôleur : FAQ
// ============================================================

const faqModel = require("../models/faq.model");

async function listFaqs(req, res) {
  try {
    const faqs = await faqModel.getAllFaqs();
    res.json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des questions fréquentes." });
  }
}

module.exports = { listFaqs };
