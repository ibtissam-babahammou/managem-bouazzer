// ============================================================
// Middleware : auth.middleware
// Vérifie le token JWT envoyé par le frontend et identifie
// l'utilisateur connecté (req.user) pour les routes protégées.
// ============================================================

const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Connexion requise." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Session invalide ou expirée." });
  }
}

// Version "douce" : si un token est présent on identifie l'utilisateur,
// sinon on continue quand même (utile pour le panier des visiteurs).
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      req.user = null;
    }
  }

  next();
}

module.exports = { requireAuth, optionalAuth };
