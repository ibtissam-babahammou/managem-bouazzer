// ============================================================
// components/SearchOverlay.jsx
// La couche de recherche qui apparaît par-dessus la page
// quand on clique sur l'icône 🔍 (comportement global du site).
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/boutique?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <form
        className="search-bar"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button type="submit">🔍</button>
      </form>
    </div>
  );
}
