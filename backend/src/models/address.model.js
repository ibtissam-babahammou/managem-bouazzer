// ============================================================
// Modèle : Addresses
// Chaque adresse appartient obligatoirement à un utilisateur
// connecté (contrairement au panier qui accepte les visiteurs).
// ============================================================

const pool = require("../config/db");

async function getAddressesByUser(userId) {
  const result = await pool.query(
    "SELECT * FROM addresses WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
}

async function getAddressById(id, userId) {
  const result = await pool.query(
    "SELECT * FROM addresses WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  return result.rows[0];
}

async function createAddress(userId, data) {
  const {
    fullName,
    email,
    phone,
    companyName,
    taxNumber,
    streetAndNumber,
    apartment,
    city,
    postalCode,
    country,
  } = data;

  const result = await pool.query(
    `INSERT INTO addresses
      (user_id, full_name, email, phone, company_name, tax_number,
       street_and_number, apartment, city, postal_code, country)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [
      userId,
      fullName,
      email,
      phone,
      companyName || null,
      taxNumber || null,
      streetAndNumber,
      apartment || null,
      city,
      postalCode,
      country,
    ]
  );
  return result.rows[0];
}

async function updateAddress(id, userId, data) {
  const {
    fullName,
    email,
    phone,
    companyName,
    taxNumber,
    streetAndNumber,
    apartment,
    city,
    postalCode,
    country,
  } = data;

  const result = await pool.query(
    `UPDATE addresses SET
       full_name = $1, email = $2, phone = $3, company_name = $4,
       tax_number = $5, street_and_number = $6, apartment = $7,
       city = $8, postal_code = $9, country = $10
     WHERE id = $11 AND user_id = $12
     RETURNING *`,
    [
      fullName,
      email,
      phone,
      companyName || null,
      taxNumber || null,
      streetAndNumber,
      apartment || null,
      city,
      postalCode,
      country,
      id,
      userId,
    ]
  );
  return result.rows[0];
}

async function deleteAddress(id, userId) {
  await pool.query("DELETE FROM addresses WHERE id = $1 AND user_id = $2", [
    id,
    userId,
  ]);
}

module.exports = {
  getAddressesByUser,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
};
