// ============================================================
// Middleware : identifyCartOwner
// Détermine à qui appartient le panier :
// - Si l'utilisateur est connecté (req.user, ajouté plus tard
//   par le module d'authentification) -> on utilise son id.
// - Sinon -> on utilise un "session_id" envoyé par le frontend
//   (généré et stocké côté navigateur pour les visiteurs).
// ============================================================

function identifyCartOwner(req, res, next) {
  const sessionId = req.headers["x-session-id"];
  const userId = req.user ? req.user.id : null;

  if (!userId && !sessionId) {
    return res.status(400).json({
      message:
        "Impossible d'identifier le panier : aucun utilisateur connecté ni identifiant de session fourni.",
    });
  }

  req.cartOwner = { userId, sessionId };
  next();
}

module.exports = identifyCartOwner;
