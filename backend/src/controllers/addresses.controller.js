// ============================================================
// Contrôleur : Addresses
// ============================================================

const addressModel = require("../models/address.model");

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "phone",
  "streetAndNumber",
  "city",
  "postalCode",
  "country",
];

function validateAddress(body) {
  for (const field of REQUIRED_FIELDS) {
    if (!body[field]) {
      return `Le champ "${field}" est requis.`;
    }
  }
  return null;
}

async function listAddresses(req, res) {
  try {
    const addresses = await addressModel.getAddressesByUser(req.user.id);
    res.json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des adresses." });
  }
}

async function createAddress(req, res) {
  try {
    const errorMessage = validateAddress(req.body);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }
    const address = await addressModel.createAddress(req.user.id, req.body);
    res.status(201).json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'adresse." });
  }
}

async function updateAddress(req, res) {
  try {
    const errorMessage = validateAddress(req.body);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }
    const address = await addressModel.updateAddress(
      req.params.id,
      req.user.id,
      req.body
    );
    if (!address) {
      return res.status(404).json({ message: "Adresse introuvable." });
    }
    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'adresse." });
  }
}

async function removeAddress(req, res) {
  try {
    await addressModel.deleteAddress(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'adresse." });
  }
}

module.exports = {
  listAddresses,
  createAddress,
  updateAddress,
  removeAddress,
};
