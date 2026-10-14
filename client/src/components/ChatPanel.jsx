import React, { useEffect, useRef, useState } from "react";
import { fetchModels, askSingle, askAll } from "../api.js";
import AnswerCard from "./AnswerCard.jsx";

export default function ChatPanel() {
  const [models, setModels] = useState([]);
  const [model, setModel] = useState("");
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState("single"); // single | all
  const [busy, setBusy] = useState(false);

  // single mode
  const [answer, setAnswer] = useState(null);

  // all mode: cards keyed by model id
  const [cards, setCards] = useState([]); // {model, status: waiting|answering|done|error, answer, ms, error}
  const [progress, setProgress] = useState(null); // {i, total}
  const stopRef = useRef(null);

  useEffect(() => {
    fetchModels({ chatReady: "1" }).then((d) => {
      setModels(d.models);
      if (d.models.length) setModel(d.models[0].id);
    });
    return () => stopRef.current && stopRef.current();
  }, []);

  const ask = async () => {
    if (!question.trim() || busy) return;
    setBusy(true);
    setAnswer(null);

    if (mode === "single") {
      const res = await askSingle(model, question);
      setAnswer(res);
      setBusy(false);
    } else {
      const fresh = models.map((m) => ({ model: m.id, name: m.name, publisher: m.publisher, category: m.category, status: "waiting" }));
      setCards(fresh);
      setProgress({ i: 0, total: fresh.length });
      let i = 0;
      stopRef.current = askAll(question, (ev) => {
        setCards((prev) => {
          const next = [...prev];
          const idx = next.findIndex((c) => c.model === ev.model);
          if (ev.type === "answering" && idx >= 0) next[idx] = { ...next[idx], status: "answering" };
          if (ev.type === "answer" && idx >= 0) next[idx] = { ...next[idx], status: "done", answer: ev.answer, ms: ev.ms, demo: ev.demo };
          if (ev.type === "error" && idx >= 0) next[idx] = { ...next[idx], status: "error", error: ev.error };
          return next;
        });
        if (ev.type === "answering") setProgress({ i: ++i, total: models.length });
        if (ev.type === "done") setBusy(false);
      });
    }
  };

  const stop = () => {
    stopRef.current && stopRef.current();
    setBusy(false);
    setCards((prev) => prev.map((c) => (c.status === "waiting" || c.status === "answering" ? { ...c, status: "error", error: "aborted" } : c)));
  };

  return (
    <section className="chat-panel">
      <div className="controls card">
        <div className="mode-toggle" role="tablist">
          <button className={mode === "single" ? "on" : ""} onClick={() => setMode("single")}>
            ① Ask one model
          </button>
          <button className={mode === "all" ? "on" : ""} onClick={() => setMode("all")}>
            ② Ask ALL models ({models.length})
          </button>
        </div>

        <div className="row">
          {mode === "single" && (
            <label className="field select-field">
              <span>Model</span>
              <select value={model} onChange={(e) => setModel(e.target.value)} disabled={busy}>
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.publisher}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="field grow">
            <span>Your question</span>
            <textarea
              rows={2}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ask();
              }}
              placeholder="e.g. Explain quantum computing in simple words…  (⌘/Ctrl+Enter to send)"
              disabled={busy}
            />
          </label>
          <button className="btn ask" onClick={ask} disabled={busy || !question.trim()}>
            {busy ? "Answering…" : "Ask"}
          </button>
          {busy && mode === "all" && (
            <button className="btn stop" onClick={stop}>
              Stop
            </button>
          )}
        </div>

        {mode === "all" && progress && (
          <div className="progress">
            <div className="bar" style={{ width: `${(progress.i / progress.total) * 100}%` }} />
            <span>
              {progress.i}/{progress.total} models answered
            </span>
          </div>
        )}
      </div>

      {mode === "single" && answer && (
        <div className={`card answer-block ${answer.error ? "err" : ""}`}>
          <div className="answer-head">
            <strong>{answer.model}</strong>
            {answer.ms != null && <span className="ms">{(answer.ms / 1000).toFixed(1)}s</span>}
          </div>
          {answer.error ? (
            <p className="error">⚠️ {answer.error}</p>
          ) : (
            <pre className="answer-text">{answer.answer}</pre>
          )}
        </div>
      )}

      {mode === "all" && cards.length > 0 && (
        <div className="answers-grid">
          {cards.map((c) => (
            <AnswerCard key={c.model} card={c} />
          ))}
        </div>
      )}
    </section>
  );
}
