require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const AiModel = require("./models/AiModel");
const seedData = require("./seed-data");
const nvidia = require("./services/nvidia");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => res.json({ ok: true, provider: nvidia.mode() }));
app.use("/api/models", require("./routes/models"));
app.use("/api/chat", require("./routes/chat"));

// serve the built client (production): client/dist
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));
app.get(/^\/(?!api).*/, (req, res) =>
  res.sendFile(path.join(__dirname, "..", "..", "client", "dist", "index.html"))
);

const PORT = process.env.PORT || 4000;

(async () => {
  await db.sync();
  const count = await AiModel.count();
  if (count !== seedData.length) {
    // refresh catalog (idempotent upsert)
    for (const m of seedData) await AiModel.upsert(m);
    console.log(`[seed] catalog refreshed: ${seedData.length} models (had ${count})`);
  }
  app.listen(PORT, () => {
    console.log(`[nvidia-playground] API on http://localhost:${PORT} · provider=${nvidia.mode()} · models=${seedData.length}`);
  });
})();
