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

module.exports = { getAllFaqs, createFaq };
