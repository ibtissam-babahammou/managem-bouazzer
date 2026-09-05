// ============================================================
// Contrôleur : Products
// ============================================================

const productModel = require("../models/product.model");

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

module.exports = {
  listProducts,
  getProduct,
};
