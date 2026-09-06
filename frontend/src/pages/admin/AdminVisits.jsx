// ============================================================
// pages/admin/AdminVisits.jsx
// ============================================================

import { useEffect, useState } from "react";
import apiClient from "../../api/client";

export default function AdminVisits() {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    apiClient.get("/visits/admin/all").then((res) => setVisits(res.data));
  }, []);

  return (
    <div className="admin-visits">
      <h1>Rendez-vous</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Organisation</th>
            <th>Contact</th>
            <th>Participants</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v) => (
            <tr key={v.id}>
              <td>
                {v.visit_date} — {v.visit_time}
              </td>
              <td>
                {v.organization_name} ({v.organization_type})
              </td>
              <td>
                {v.full_name} <br /> {v.phone}
              </td>
              <td>{v.participants_count}</td>
              <td>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
