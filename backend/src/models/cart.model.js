// ============================================================
// Modèle : Cart (Panier)
// Le panier peut appartenir soit à un utilisateur connecté
// (user_id), soit à un visiteur non connecté (session_id).
// Un seul des deux est utilisé à la fois.
// ============================================================

const pool = require("../config/db");

// Construit la condition SQL selon si c'est un user connecté ou un visiteur
function buildOwnerCondition({ userId, sessionId }, paramIndex) {
  if (userId) {
    return { clause: `user_id = $${paramIndex}`, value: userId };
  }
  return { clause: `session_id = $${paramIndex}`, value: sessionId };
}

async function getCartItems(owner) {
  const { clause, value } = buildOwnerCondition(owner, 1);
  const result = await pool.query(
    `SELECT ci.id, ci.quantity, p.id AS product_id, p.name, p.price,
            p.image_url, COALESCE(i.quantity, 0) AS stock_quantity
     FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     LEFT JOIN inventory i ON i.product_id = p.id
     WHERE ci.${clause}`,
    [value]
  );
  return result.rows;
}

async function findExistingItem(owner, productId) {
  const { clause, value } = buildOwnerCondition(owner, 2);
  const result = await pool.query(
    `SELECT * FROM cart_items WHERE product_id = $1 AND ${clause}`,
    [productId, value]
  );
  return result.rows[0];
}

async function addItem(owner, productId, quantity) {
  const existing = await findExistingItem(owner, productId);

  if (existing) {
    const result = await pool.query(
      `UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2 RETURNING *`,
      [quantity, existing.id]
    );
    return result.rows[0];
  }

  const result = await pool.query(
    `INSERT INTO cart_items (user_id, session_id, product_id, quantity)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [owner.userId || null, owner.sessionId || null, productId, quantity]
  );
  return result.rows[0];
}

async function updateItemQuantity(itemId, quantity) {
  const result = await pool.query(
    `UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *`,
    [quantity, itemId]
  );
  return result.rows[0];
}

async function removeItem(itemId) {
  await pool.query(`DELETE FROM cart_items WHERE id = $1`, [itemId]);
}

async function clearCart(owner) {
  const { clause, value } = buildOwnerCondition(owner, 1);
  await pool.query(`DELETE FROM cart_items WHERE ${clause}`, [value]);
}

module.exports = {
  getCartItems,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
};
