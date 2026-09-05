// ============================================================
// Modèle : Wishlist
// ============================================================

const pool = require("../config/db");

async function getWishlistByUser(userId) {
  const result = await pool.query(
    `SELECT w.id, p.* FROM wishlist_items w
     JOIN products p ON p.id = w.product_id
     WHERE w.user_id = $1
     ORDER BY w.created_at DESC`,
    [userId]
  );
  return result.rows;
}

async function addToWishlist(userId, productId) {
  const result = await pool.query(
    `INSERT INTO wishlist_items (user_id, product_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, product_id) DO NOTHING
     RETURNING *`,
    [userId, productId]
  );
  return result.rows[0];
}

async function removeFromWishlist(userId, productId) {
  await pool.query(
    "DELETE FROM wishlist_items WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );
}

module.exports = { getWishlistByUser, addToWishlist, removeFromWishlist };
