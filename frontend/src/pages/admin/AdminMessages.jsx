// ============================================================
// pages/admin/AdminMessages.jsx
// ============================================================

import { useEffect, useState } from "react";
import apiClient from "../../api/client";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    apiClient.get("/contact").then((res) => setMessages(res.data));
  }, []);

  return (
    <div className="admin-messages">
      <h1>Messages reçus</h1>

      <div className="admin-messages-list">
        {messages.map((m) => (
          <div key={m.id} className="admin-message-card">
            <p>
              <strong>{m.full_name}</strong> — {m.email} — {m.phone}
            </p>
            <p>
              <em>{m.subject}</em>
            </p>
            <p>{m.message}</p>
            <p className="hint">{new Date(m.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
