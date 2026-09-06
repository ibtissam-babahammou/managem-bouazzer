// ============================================================
// Contrôleur : Products
// ============================================================

const productModel = require("../models/product.model");
const inventoryModel = require("../models/inventory.model");

async function listProducts(req, res) {
  try {
    const { categoryId, search } = req.query;
    const products = await productModel.getAllProducts({ categoryId, search });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des produits." });
  }
}

async function getProduct(req, res) {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable." });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération du produit." });
  }
}

// ---------- Réservé au personnel autorisé (Admin) ----------

async function listProductsAdmin(req, res) {
  try {
    const products = await productModel.getAllProductsAdmin();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des produits." });
  }
}

async function createProduct(req, res) {
  try {
    const {
      category_id,
      name,
      description,
      price,
      image_url,
      weight,
      dimensions,
      ruban,
      initial_stock,
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Le nom et le prix sont requis." });
    }

    const product = await productModel.createProduct({
      category_id,
      name,
      description,
      price,
      image_url,
      weight,
      dimensions,
      ruban,
    });

    await inventoryModel.createInventoryRow(product.id, initial_stock || 0);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du produit." });
  }
}

async function updateProduct(req, res) {
  try {
    const updated = await productModel.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Produit introuvable." });
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit." });
  }
}

async function deleteProduct(req, res) {
  try {
    await productModel.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression du produit." });
  }
}

module.exports = {
  listProducts,
  getProduct,
  listProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
};
