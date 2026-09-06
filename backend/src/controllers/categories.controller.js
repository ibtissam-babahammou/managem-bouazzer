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

// ---------- Réservé au personnel autorisé ----------

async function createCategory(req, res) {
  try {
    const { name, description, icon_url } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Le nom de la catégorie est requis." });
    }
    const category = await categoryModel.createCategory({ name, description, icon_url });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la catégorie." });
  }
}

async function updateCategory(req, res) {
  try {
    const updated = await categoryModel.updateCategory(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Catégorie introuvable." });
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie." });
  }
}

async function deleteCategory(req, res) {
  try {
    await categoryModel.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la catégorie." });
  }
}

module.exports = {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
