// ============================================================
// Middleware : requireAdmin
// À utiliser après requireAuth. Réservé aux routes de gestion
// interne (ex: lire les messages de contact, gérer le stock...).
// ============================================================

function requireAdmin(req, res, next) {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "employe")) {
    return res.status(403).json({ message: "Accès réservé au personnel autorisé." });
  }
  next();
}

module.exports = requireAdmin;
