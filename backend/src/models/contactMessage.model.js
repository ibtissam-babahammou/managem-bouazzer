// ============================================================
// Modèle : Contact Messages
// ============================================================

const pool = require("../config/db");

async function createMessage({ fullName, phone, email, companyName, subject, message }) {
  const result = await pool.query(
    `INSERT INTO contact_messages (full_name, phone, email, company_name, subject, message)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [fullName, phone, email, companyName || null, subject, message]
  );
  return result.rows[0];
}

async function getAllMessages() {
  const result = await pool.query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC"
  );
  return result.rows;
}

module.exports = { createMessage, getAllMessages };
