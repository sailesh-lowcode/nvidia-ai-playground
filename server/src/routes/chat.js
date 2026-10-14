const router = require("express").Router();
const AiModel = require("../models/AiModel");
const nvidia = require("../services/nvidia");

// POST /api/chat  { model, question }  -> single model answer
router.post("/", async (req, res) => {
  const { model, question } = req.body ?? {};
  if (!model || !question) return res.status(400).json({ error: "model and question are required" });

  const exists = await AiModel.findByPk(model);
  if (!exists) return res.status(404).json({ error: `unknown model: ${model}` });

  const t0 = Date.now();
  try {
    const out = await nvidia.chatCompletion(model, [
      { role: "system", content: "You are a helpful assistant. Answer clearly and concisely." },
      { role: "user", content: question },
    ]);
    res.json({ model, question, answer: out.content, demo: !!out.demo, usage: out.usage ?? null, ms: Date.now() - t0 });
  } catch (err) {
    res.status(502).json({ model, error: err.response?.data?.error?.message || err.message, ms: Date.now() - t0 });
  }
});

// GET /api/chat/all?question=...  -> SSE stream: every chat-ready model answers one by one
// events: {type:"start",total} | {type:"answering",model} | {type:"answer",model,answer,ms,demo}
//         | {type:"error",model,error} | {type:"done",answered,failed}
router.get("/all", async (req, res) => {
  const question = req.query.question;
  if (!question) return res.status(400).json({ error: "question query param is required" });

  const models = (await AiModel.findAll({ where: { free: true, chatReady: true }, order: [["name", "ASC"]] }))
    .map((m) => m.id);

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);
  send({ type: "start", total: models.length, question });

  let answered = 0, failed = 0;
  let closed = false;
  res.on("close", () => { closed = true; });

  for (const model of models) {
    if (closed) break;
    send({ type: "answering", model });
    const t0 = Date.now();
    try {
      const out = await nvidia.chatCompletion(
        model,
        [
          { role: "system", content: "You are a helpful assistant. Answer clearly and concisely." },
          { role: "user", content: question },
        ],
        { maxTokens: 350 } // keep multi-model sweep fast
      );
      send({ type: "answer", model, answer: out.content, demo: !!out.demo, ms: Date.now() - t0 });
      answered++;
    } catch (err) {
      send({ type: "error", model, error: err.response?.data?.error?.message || err.message });
      failed++;
    }
  }

  send({ type: "done", answered, failed });
  res.end();
});

module.exports = router;
