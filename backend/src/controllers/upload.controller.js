// ============================================================
// Contrôleur : Upload d'images
// ============================================================

const cloudinary = require("../config/cloudinary");

function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Aucune image envoyée." });
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: "bouazzer-minerals" },
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de l'envoi de l'image." });
      }
      res.json({ url: result.secure_url });
    }
  );

  uploadStream.end(req.file.buffer);
}

module.exports = { uploadImage };
