// ============================================================
// components/ImageUploader.jsx
// Un bouton simple pour envoyer une image et récupérer son URL.
// Utilisé dans les formulaires d'administration.
// ============================================================

import { useState } from "react";
import apiClient from "../api/client";

export default function ImageUploader({ currentUrl, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || "");

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPreview(res.data.url);
      onUploaded(res.data.url);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi de l'image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="image-uploader">
      {preview && <img src={preview} alt="Aperçu" className="image-preview" />}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p>Envoi en cours...</p>}
    </div>
  );
}
