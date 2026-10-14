export async function fetchModels(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const r = await fetch(`/api/models${qs ? "?" + qs : ""}`);
  if (!r.ok) throw new Error((await r.json()).error || "failed to load models");
  return r.json();
}

export async function fetchCategories() {
  const r = await fetch("/api/models/categories");
  return r.json();
}

export async function askSingle(model, question) {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, question }),
  });
  return r.json();
}

// SSE stream: every chat model answers one by one
export function askAll(question, onEvent) {
  const es = new EventSource(`/api/chat/all?question=${encodeURIComponent(question)}`);
  es.onmessage = (e) => {
    const data = JSON.parse(e.data);
    onEvent(data);
    if (data.type === "done") es.close();
  };
  es.onerror = () => {
    onEvent({ type: "done", answered: 0, failed: 0, aborted: true });
    es.close();
  };
  return () => es.close();
}
