import React from "react";

const CAT_ICON = {
  chat: "💬", code: "💻", vision: "👁️", omni: "🌐", embedding: "🧲",
  safety: "🛡️", translation: "🌍", document: "📄", domain: "🎓",
};

export default function AnswerCard({ card }) {
  const { name, publisher, category, status, answer, ms, error, demo } = card;

  return (
    <div className={`card answer-card ${status}`}>
      <div className="answer-head">
        <span className="cat-ico">{CAT_ICON[category] || "🤖"}</span>
        <div className="who">
          <strong title={card.model}>{name}</strong>
          <small>{publisher}</small>
        </div>
        <span className={`status-dot ${status}`} title={status} />
      </div>

      {status === "waiting" && <p className="muted">waiting…</p>}
      {status === "answering" && (
        <div className="typing">
          <i /><i /><i /> <span>answering…</span>
        </div>
      )}
      {status === "done" && (
        <>
          <pre className="answer-text">{answer}</pre>
          <div className="card-foot">
            {ms != null && <span className="ms">{(ms / 1000).toFixed(1)}s</span>}
            {demo && <span className="demo-tag">demo</span>}
          </div>
        </>
      )}
      {status === "error" && <p className="error">⚠️ {error}</p>}
    </div>
  );
}
