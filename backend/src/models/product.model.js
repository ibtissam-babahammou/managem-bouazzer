// ============================================================
// Modèle : Products
// Requêtes SQL liées aux produits (pierres et minéraux).
// Le stock (inventory) est toujours joint pour savoir si un
// produit est disponible à l'achat.
// ============================================================

const pool = require("../config/db");

// Récupère tous les produits publiés, avec filtre optionnel par catégorie
async function getAllProducts({ categoryId, search } = {}) {
  let query = `
    SELECT p.*, c.name AS category_name,
           COALESCE(i.quantity, 0) AS stock_quantity
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN inventory i ON i.product_id = p.id
    WHERE p.is_published = TRUE
  `;
  const params = [];

  if (categoryId) {
    params.push(categoryId);
    query += ` AND p.category_id = $${params.length}`;
  }

  if (search) {
    params.push(`%${search}%`);
    query += ` AND p.name ILIKE $${params.length}`;
  }

  query += " ORDER BY p.created_at DESC";

  const result = await pool.query(query, params);
  return result.rows;
}

async function getProductById(id) {
  const result = await pool.query(
    `SELECT p.*, c.name AS category_name,
            COALESCE(i.quantity, 0) AS stock_quantity
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN inventory i ON i.product_id = p.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0];
}

async function createProduct({
  category_id,
  name,
  description,
  price,
  image_url,
  weight,
  dimensions,
  ruban,
}) {
  const result = await pool.query(
    `INSERT INTO products
      (category_id, name, description, price, image_url, weight, dimensions, ruban)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [category_id, name, description, price, image_url, weight, dimensions, ruban]
  );
  return result.rows[0];
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
