// ============================================================
// Modèle : Visits (Rendez-vous / Visites de la mine)
// ============================================================

const pool = require("../config/db");

async function getVisitsByUser(userId) {
  const result = await pool.query(
    "SELECT * FROM visits WHERE user_id = $1 ORDER BY visit_date DESC, visit_time DESC",
    [userId]
  );
  return result.rows;
}

async function getVisitById(id) {
  const result = await pool.query("SELECT * FROM visits WHERE id = $1", [id]);
  return result.rows[0];
}

async function createVisit(userId, data) {
  const {
    visitDate,
    visitTime,
    fullName,
    email,
    phone,
    organizationName,
    organizationType,
    participantsCount,
    groupLeaderName,
  } = data;

  const result = await pool.query(
    `INSERT INTO visits
      (user_id, visit_date, visit_time, full_name, email, phone,
       organization_name, organization_type, participants_count,
       group_leader_name, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'confirmee')
     RETURNING *`,
    [
      userId || null,
      visitDate,
      visitTime,
      fullName,
      email,
      phone,
      organizationName,
      organizationType,
      participantsCount,
      groupLeaderName,
    ]
  );
  return result.rows[0];
}

async function rescheduleVisit(id, { visitDate, visitTime }) {
  const result = await pool.query(
    `UPDATE visits SET visit_date = $1, visit_time = $2, status = 'replanifiee'
     WHERE id = $3 RETURNING *`,
    [visitDate, visitTime, id]
  );
  return result.rows[0];
}

async function cancelVisit(id) {
  const result = await pool.query(
    `UPDATE visits SET status = 'annulee' WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  getVisitsByUser,
  getVisitById,
  createVisit,
  rescheduleVisit,
  cancelVisit,
};
