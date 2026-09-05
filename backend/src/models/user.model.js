// ============================================================
// Modèle : Users
// ============================================================

const pool = require("../config/db");

async function findByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    "SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function createUser({ fullName, email, phone, passwordHash }) {
  const result = await pool.query(
    `INSERT INTO users (full_name, email, phone, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, full_name, email, phone, role, created_at`,
    [fullName, email, phone, passwordHash]
  );
  return result.rows[0];
}

async function updateUser(id, { fullName, phone }) {
  const result = await pool.query(
    `UPDATE users SET full_name = $1, phone = $2 WHERE id = $3
     RETURNING id, full_name, email, phone, role, created_at`,
    [fullName, phone, id]
  );
  return result.rows[0];
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateUser,
};
