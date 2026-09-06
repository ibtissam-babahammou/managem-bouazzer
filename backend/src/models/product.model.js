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

async function updateProduct(id, data) {
  const {
    category_id,
    name,
    description,
    price,
    image_url,
    weight,
    dimensions,
    ruban,
    is_published,
  } = data;

  const result = await pool.query(
    `UPDATE products SET
       category_id = $1, name = $2, description = $3, price = $4,
       image_url = $5, weight = $6, dimensions = $7, ruban = $8,
       is_published = $9
     WHERE id = $10 RETURNING *`,
    [
      category_id,
      name,
      description,
      price,
      image_url,
      weight,
      dimensions,
      ruban,
      is_published,
      id,
    ]
  );
  return result.rows[0];
}

async function deleteProduct(id) {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
}

// Pour la liste d'administration : tous les produits, publiés ou non
async function getAllProductsAdmin() {
  const result = await pool.query(
    `SELECT p.*, c.name AS category_name,
            COALESCE(i.quantity, 0) AS stock_quantity
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN inventory i ON i.product_id = p.id
     ORDER BY p.created_at DESC`
  );
  return result.rows;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
};
