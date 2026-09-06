// ============================================================
// components/AdminLayout.jsx
// Structure commune à toutes les pages d'administration :
// un menu latéral + la zone de contenu qui change.
// ============================================================

import { NavLink, Outlet } from "react-router-dom";

const LINKS = [
  { to: "/admin", label: "Tableau de bord", end: true },
  { to: "/admin/produits", label: "Produits" },
  { to: "/admin/categories", label: "Catégories" },
  { to: "/admin/stock", label: "Inventaire" },
  { to: "/admin/commandes", label: "Commandes" },
  { to: "/admin/rendez-vous", label: "Rendez-vous" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/admin/faq", label: "FAQ" },
];

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Administration</h2>
        <nav>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
