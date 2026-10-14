import React from "react";

const CAT_LABEL = {
  chat: "Chat & Reasoning", code: "Code", vision: "Vision & Video", omni: "Omni",
  embedding: "Embeddings & Retrieval", safety: "Safety & Guardrails", translation: "Translation",
  document: "Document Parsing", domain: "Domain (med/fin/creative)",
};

export default function ModelDetail({ model, onClose }) {
  const rows = [
    ["Model ID", model.id],
    ["Publisher", model.publisher],
    ["Category", CAT_LABEL[model.category] || model.category],
    ["Parameters", model.params],
    ["Context length", model.context],
    ["Chat ready", model.chatReady ? "✅ yes — queryable in the Chatbot tab" : "— not a chat model (task-specific API)"],
    ["Price", "Free (NVIDIA-hosted, rate-limited)"],
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">✕</button>
        <h2>{model.name}</h2>
        <p className="muted">{model.description}</p>

        <h4>Specifications</h4>
        <table className="spec-table">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <th>{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Capabilities</h4>
        <div className="cap-row">
          {model.capabilities.map((c) => (
            <span key={c} className="pill cap">{c}</span>
          ))}
        </div>

        <h4>Endpoint</h4>
        <pre className="endpoint">POST /v1/chat/completions  ·  model: "{model.id}"</pre>
      </div>
    </div>
  );
}
