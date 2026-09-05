// ============================================================
// Modèle : Orders (Commandes)
// C'est ici que le panier devient une vraie commande.
// Toute l'opération se fait dans une transaction : soit tout
// réussit (commande + stock + panier vidé), soit rien n'est
// modifié en cas d'erreur (pour éviter les données incohérentes).
// ============================================================

const pool = require("../config/db");

async function getOrdersByUser(userId) {
  const result = await pool.query(
    `SELECT o.*,
        json_agg(json_build_object(
          'product_id', oi.product_id,
          'product_name', p.name,
          'quantity', oi.quantity,
          'price', oi.price_at_purchase
        )) AS items
     FROM orders o
     JOIN order_items oi ON oi.order_id = o.id
     JOIN products p ON p.id = oi.product_id
     WHERE o.user_id = $1
     GROUP BY o.id
     ORDER BY o.created_at DESC`,
    [userId]
  );
  return result.rows;
}

async function getOrderById(id, userId) {
  const result = await pool.query(
    `SELECT o.*,
        json_agg(json_build_object(
          'product_id', oi.product_id,
          'product_name', p.name,
          'quantity', oi.quantity,
          'price', oi.price_at_purchase
        )) AS items
     FROM orders o
     JOIN order_items oi ON oi.order_id = o.id
     JOIN products p ON p.id = oi.product_id
     WHERE o.id = $1 AND o.user_id = $2
     GROUP BY o.id`,
    [id, userId]
  );
  return result.rows[0];
}

// Crée une commande à partir du panier actuel de l'utilisateur.
async function createOrderFromCart(userId, addressId) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Récupérer les articles du panier avec le stock disponible
    const cartResult = await client.query(
      `SELECT ci.id AS cart_item_id, ci.product_id, ci.quantity,
              p.price, p.name, COALESCE(i.quantity, 0) AS stock_quantity
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       LEFT JOIN inventory i ON i.product_id = p.id
       WHERE ci.user_id = $1`,
      [userId]
    );
    const cartItems = cartResult.rows;

    if (cartItems.length === 0) {
      throw new Error("EMPTY_CART");
    }

    // 2. Vérifier que le stock est suffisant pour chaque article
    for (const item of cartItems) {
      if (item.quantity > item.stock_quantity) {
        throw new Error(`STOCK_INSUFFISANT:${item.name}`);
      }
    }

    // 3. Calculer les totaux
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
    const total = subtotal; // les codes de remise seront ajoutés plus tard

    // 4. Créer la commande
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, address_id, status, payment_method, subtotal, total)
       VALUES ($1, $2, 'en_attente', 'paiement_a_la_livraison', $3, $4)
       RETURNING *`,
      [userId, addressId, subtotal, total]
    );
    const order = orderResult.rows[0];

    // 5. Créer les articles de la commande + mettre à jour le stock
    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, item.price]
      );

      await client.query(
        `UPDATE inventory SET quantity = quantity - $1, last_updated = NOW()
         WHERE product_id = $2`,
        [item.quantity, item.product_id]
      );

      await client.query(
        `INSERT INTO inventory_movements (product_id, change_amount, reason)
         VALUES ($1, $2, 'commande')`,
        [item.product_id, -item.quantity]
      );
    }

    // 6. Vider le panier
    await client.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);

    await client.query("COMMIT");
    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function updateOrderStatus(id, userId, status) {
  const result = await pool.query(
    `UPDATE orders SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *`,
    [status, id, userId]
  );
  return result.rows[0];
}

module.exports = {
  getOrdersByUser,
  getOrderById,
  createOrderFromCart,
  updateOrderStatus,
};
