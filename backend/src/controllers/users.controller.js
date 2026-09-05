// ============================================================
// Contrôleur : Users (profil "Mon compte")
// ============================================================

const userModel = require("../models/user.model");

async function getProfile(req, res) {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération du profil." });
  }
}

async function updateProfile(req, res) {
  try {
    const { fullName, phone } = req.body;
    const updated = await userModel.updateUser(req.user.id, {
      fullName,
      phone,
    });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil." });
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
