// ============================================================
// Contrôleur : Contact Messages
// ============================================================

const contactModel = require("../models/contactMessage.model");

async function sendMessage(req, res) {
  try {
    const { fullName, phone, email, companyName, subject, message } = req.body;

    if (!fullName || !phone || !email || !subject || !message) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    const saved = await contactModel.createMessage({
      fullName,
      phone,
      email,
      companyName,
      subject,
      message,
    });
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'envoi du message." });
  }
}

async function listMessages(req, res) {
  try {
    const messages = await contactModel.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des messages." });
  }
}

module.exports = { sendMessage, listMessages };
