// ============================================================
// Modèle : FAQ
// ============================================================

const pool = require("../config/db");

async function getAllFaqs() {
  const result = await pool.query(
    "SELECT * FROM faqs ORDER BY display_order ASC"
  );
  return result.rows;
}

async function createFaq({ question, answer, displayOrder }) {
  const result = await pool.query(
    `INSERT INTO faqs (question, answer, display_order)
     VALUES ($1, $2, $3) RETURNING *`,
    [question, answer, displayOrder || 0]
  );
  return result.rows[0];
}

async function updateFaq(id, { question, answer, displayOrder }) {
  const result = await pool.query(
    `UPDATE faqs SET question = $1, answer = $2, display_order = $3
     WHERE id = $4 RETURNING *`,
    [question, answer, displayOrder || 0, id]
  );
  return result.rows[0];
}

async function deleteFaq(id) {
  await pool.query("DELETE FROM faqs WHERE id = $1", [id]);
}

module.exports = { getAllFaqs, createFaq, updateFaq, deleteFaq };
