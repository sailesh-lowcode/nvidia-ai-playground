import React, { useEffect, useMemo, useState } from "react";
import { fetchModels, fetchCategories } from "../api.js";
import ModelDetail from "./ModelDetail.jsx";

const CAT_META = {
  chat: { icon: "💬", label: "Chat & Reasoning" },
  code: { icon: "💻", label: "Code" },
  vision: { icon: "👁️", label: "Vision & Video" },
  omni: { icon: "🌐", label: "Omni (text+image+audio+video)" },
  embedding: { icon: "🧲", label: "Embeddings & Retrieval" },
  safety: { icon: "🛡️", label: "Safety & Guardrails" },
  translation: { icon: "🌍", label: "Translation" },
  document: { icon: "📄", label: "Document Parsing" },
  domain: { icon: "🎓", label: "Domain (med/fin/creative)" },
};

export default function ModelGrid() {
  const [models, setModels] = useState([]);
  const [cats, setCats] = useState({});
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchModels().then((d) => setModels(d.models));
    fetchCategories().then((d) => setCats(d.categories || {}));
  }, []);

  const shown = useMemo(() => {
    return models.filter((m) => {
      if (filter !== "all" && m.category !== filter) return false;
      if (q && !(`${m.name} ${m.publisher} ${m.id}`.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [models, filter, q]);

  return (
    <section className="models-panel">
      <div className="controls card">
        <input
          className="search"
          placeholder="Search 80 free models…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="chip-row">
          <button className={`chip ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>
            All ({models.length})
          </button>
          {Object.entries(cats)
            .sort((a, b) => b[1] - a[1])
            .map(([c, n]) => (
              <button key={c} className={`chip ${filter === c ? "on" : ""}`} onClick={() => setFilter(c)}>
                {CAT_META[c]?.icon} {CAT_META[c]?.label || c} ({n})
              </button>
            ))}
        </div>
      </div>

      <div className="model-grid">
        {shown.map((m) => (
          <button key={m.id} className="card model-card" onClick={() => setSelected(m)}>
            <div className="model-top">
              <span className="cat-ico big">{CAT_META[m.category]?.icon || "🤖"}</span>
              {m.chatReady && <span className="pill chat">chat ready</span>}
            </div>
            <h3>{m.name}</h3>
            <p className="muted pub">
              {m.publisher} · {m.params}
            </p>
            <p className="desc">{m.description}</p>
            <div className="specs-row">
              <span className="spec">📏 {m.context}</span>
              <span className="spec">{m.category}</span>
            </div>
          </button>
        ))}
      </div>

      {selected && <ModelDetail model={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
