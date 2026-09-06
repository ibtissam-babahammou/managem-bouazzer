// ============================================================
// middleware/upload.js
// Reçoit un fichier image envoyé par le formulaire (en mémoire,
// pas sur le disque, car Vercel ne permet pas d'écrire des
// fichiers de façon permanente).
// ============================================================

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo maximum par image
});

module.exports = upload;
