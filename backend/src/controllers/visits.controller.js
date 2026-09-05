// ============================================================
// Contrôleur : Visits (Rendez-vous)
// ============================================================

const visitModel = require("../models/visit.model");

const REQUIRED_FIELDS = [
  "visitDate",
  "visitTime",
  "fullName",
  "email",
  "phone",
  "organizationName",
  "organizationType",
  "participantsCount",
  "groupLeaderName",
];

function validateVisit(body) {
  for (const field of REQUIRED_FIELDS) {
    if (!body[field]) {
      return `Le champ "${field}" est requis.`;
    }
  }
  return null;
}

async function listMyVisits(req, res) {
  try {
    const visits = await visitModel.getVisitsByUser(req.user.id);
    res.json(visits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous." });
  }
}

async function createVisit(req, res) {
  try {
    const errorMessage = validateVisit(req.body);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    const userId = req.user ? req.user.id : null;
    const visit = await visitModel.createVisit(userId, req.body);
    res.status(201).json(visit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du rendez-vous." });
  }
}

async function rescheduleVisit(req, res) {
  try {
    const { visitDate, visitTime } = req.body;
    if (!visitDate || !visitTime) {
      return res
        .status(400)
        .json({ message: "Nouvelle date et heure requises." });
    }
    const visit = await visitModel.rescheduleVisit(req.params.id, {
      visitDate,
      visitTime,
    });
    if (!visit) {
      return res.status(404).json({ message: "Rendez-vous introuvable." });
    }
    res.json(visit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la replanification." });
  }
}

async function cancelVisit(req, res) {
  try {
    const visit = await visitModel.cancelVisit(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: "Rendez-vous introuvable." });
    }
    res.json(visit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'annulation." });
  }
}

module.exports = {
  listMyVisits,
  createVisit,
  rescheduleVisit,
  cancelVisit,
};
