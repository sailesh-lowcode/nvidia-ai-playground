import React, { useEffect, useState } from "react";
import ChatPanel from "./components/ChatPanel.jsx";
import ModelGrid from "./components/ModelGrid.jsx";

export default function App() {
  const [tab, setTab] = useState("chat"); // chat | models
  const [cats, setCats] = useState(null);
  const [provider, setProvider] = useState("");

  useEffect(() => {
    fetch("/api/models/categories")
      .then((r) => r.json())
      .then(setCats)
      .catch(() => setCats({ categories: {} }));
    fetch("/api/health")
      .then((r) => r.json())
      .then((h) => setProvider(h.provider))
      .catch(() => {});
  }, []);

  const total = cats ? Object.values(cats.categories || {}).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">N</span>
          <div>
            <h1>NVIDIA Free Models</h1>
            <p>
              {total} free AI models {provider && <span className="pill provider">provider: {provider}</span>}
            </p>
          </div>
        </div>
        <nav className="tabs">
          <button className={tab === "chat" ? "on" : ""} onClick={() => setTab("chat")}>
            💬 Chatbot
          </button>
          <button className={tab === "models" ? "on" : ""} onClick={() => setTab("models")}>
            🧠 Models {cats && <span className="badge">{total}</span>}
          </button>
        </nav>
      </header>

      {tab === "chat" ? <ChatPanel /> : <ModelGrid />}

      <footer>
        Built with React + Vite · Express + Sequelize + SQLite · models via NVIDIA NIM
        {provider === "demo" && " — demo mode (no key set, see server/.env.example)"}
      </footer>
    </div>
  );
}
