// ============================================================
// Modèle : Categories
// Ce fichier contient uniquement les requêtes SQL liées aux
// catégories de produits. Aucune autre partie du code n'écrit
// de requêtes SQL directement sur cette table.
// ============================================================

const pool = require("../config/db");

async function getAllCategories() {
  const result = await pool.query(
    "SELECT * FROM categories ORDER BY name ASC"
  );
  return result.rows;
}

async function getCategoryById(id) {
  const result = await pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function createCategory({ name, description, icon_url }) {
  const result = await pool.query(
    `INSERT INTO categories (name, description, icon_url)
     VALUES ($1, $2, $3) RETURNING *`,
    [name, description, icon_url]
  );
  return result.rows[0];
}

async function updateCategory(id, { name, description, icon_url }) {
  const result = await pool.query(
    `UPDATE categories SET name = $1, description = $2, icon_url = $3
     WHERE id = $4 RETURNING *`,
    [name, description, icon_url, id]
  );
  return result.rows[0];
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
