// ============================================================
// Modèle : Inventory (Inventaire)
// ============================================================

const pool = require("../config/db");

async function createInventoryRow(productId, quantity = 0) {
  const result = await pool.query(
    `INSERT INTO inventory (product_id, quantity)
     VALUES ($1, $2) RETURNING *`,
    [productId, quantity]
  );
  return result.rows[0];
}

async function setQuantity(productId, quantity) {
  const result = await pool.query(
    `UPDATE inventory SET quantity = $1, last_updated = NOW()
     WHERE product_id = $2 RETURNING *`,
    [quantity, productId]
  );

  if (result.rows[0]) {
    await pool.query(
      `INSERT INTO inventory_movements (product_id, change_amount, reason)
       VALUES ($1, $2, 'ajustement_manuel')`,
      [productId, quantity]
    );
  }
  return result.rows[0];
}

async function getAllInventory() {
  const result = await pool.query(
    `SELECT p.id AS product_id, p.name, i.quantity, i.alert_threshold, i.last_updated
     FROM products p
     LEFT JOIN inventory i ON i.product_id = p.id
     ORDER BY p.name ASC`
  );
  return result.rows;
}

module.exports = { createInventoryRow, setQuantity, getAllInventory };
