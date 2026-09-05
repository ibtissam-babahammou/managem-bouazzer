// ============================================================
// Contrôleur : Categories
// Reçoit les requêtes du routeur, appelle le modèle, renvoie
// la réponse. Ne contient aucune requête SQL directement.
// ============================================================

const categoryModel = require("../models/category.model");

async function listCategories(req, res) {
  try {
    const categories = await categoryModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des catégories." });
  }
}

async function getCategory(req, res) {
  try {
    const category = await categoryModel.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable." });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération de la catégorie." });
  }
}

module.exports = {
  listCategories,
  getCategory,
};
