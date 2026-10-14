const router = require("express").Router();
const AiModel = require("../models/AiModel");

// GET /api/models            -> all free models (optionally ?category=chat or ?chatReady=1)
// GET /api/models/categories -> category -> count summary
router.get("/", async (req, res) => {
  const where = { free: true };
  if (req.query.category) where.category = req.query.category;
  if (req.query.chatReady === "1") where.chatReady = true;

  const order =
    req.query.chatReady === "1"
      ? [["category", "ASC"], ["name", "ASC"]]
      : [["category", "ASC"], ["publisher", "ASC"], ["name", "ASC"]];

  const models = await AiModel.findAll({ where, order });
  res.json({ count: models.length, provider: require("../services/nvidia").mode(), models });
});

router.get("/categories", async (req, res) => {
  const models = await AiModel.findAll({ where: { free: true } });
  const summary = {};
  for (const m of models) summary[m.category] = (summary[m.category] || 0) + 1;
  res.json({ count: models.length, categories: summary });
});

// GET /api/models/:id -> single model with full specs
router.get("/:id", async (req, res) => {
  const model = await AiModel.findByPk(req.params.id);
  if (!model) return res.status(404).json({ error: "model not found" });
  res.json({ model });
});

module.exports = router;
