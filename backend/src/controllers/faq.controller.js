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

async function addFaq(req, res) {
  try {
    const { question, answer, displayOrder } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: "La question et la réponse sont requises." });
    }
    const faq = await faqModel.createFaq({ question, answer, displayOrder });
    res.status(201).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création." });
  }
}

async function editFaq(req, res) {
  try {
    const updated = await faqModel.updateFaq(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Question introuvable." });
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
}

async function removeFaq(req, res) {
  try {
    await faqModel.deleteFaq(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
}

module.exports = { listFaqs, addFaq, editFaq, removeFaq };
