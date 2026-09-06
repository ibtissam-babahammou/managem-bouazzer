// ============================================================
// Contrôleur : Orders (Commandes)
// ============================================================

const orderModel = require("../models/order.model");

async function listOrders(req, res) {
  try {
    const orders = await orderModel.getOrdersByUser(req.user.id);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des commandes." });
  }
}

async function getOrder(req, res) {
  try {
    const order = await orderModel.getOrderById(req.params.id, req.user.id);
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable." });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération de la commande." });
  }
}

async function checkout(req, res) {
  try {
    const { addressId } = req.body;

    if (!addressId) {
      return res.status(400).json({ message: "Une adresse de facturation est requise." });
    }

    const order = await orderModel.createOrderFromCart(req.user.id, addressId);
    res.status(201).json(order);
  } catch (error) {
    if (error.message === "EMPTY_CART") {
      return res.status(400).json({ message: "Votre panier est vide." });
    }
    if (error.message.startsWith("STOCK_INSUFFISANT")) {
      const productName = error.message.split(":")[1];
      return res.status(409).json({
        message: `Stock insuffisant pour le produit "${productName}".`,
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la commande." });
  }
}

async function cancelOrder(req, res) {
  try {
    const order = await orderModel.updateOrderStatus(
      req.params.id,
      req.user.id,
      "annulee"
    );
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable." });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'annulation de la commande." });
  }
}

// ---------- Réservé au personnel autorisé ----------

async function listAllOrdersAdmin(req, res) {
  try {
    const orders = await orderModel.getAllOrdersAdmin();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des commandes." });
  }
}

async function updateStatusAdmin(req, res) {
  try {
    const { status } = req.body;
    const validStatuses = ["en_attente", "confirmee", "livree", "annulee"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Statut invalide." });
    }
    const order = await orderModel.updateOrderStatusAdmin(req.params.id, status);
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable." });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la commande." });
  }
}

module.exports = {
  listOrders,
  getOrder,
  checkout,
  cancelOrder,
  listAllOrdersAdmin,
  updateStatusAdmin,
};
