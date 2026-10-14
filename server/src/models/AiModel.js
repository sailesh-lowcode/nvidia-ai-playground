const { DataTypes } = require("sequelize");
const db = require("../db");

const AiModel = db.define("AiModel", {
  id: { type: DataTypes.STRING, primaryKey: true },      // e.g. "nvidia/nemotron-3-super-120b-a12b"
  name: { type: DataTypes.STRING, allowNull: false },
  publisher: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false }, // chat|code|vision|omni|embedding|safety|translation|document|domain
  params: { type: DataTypes.STRING },                     // "70B", "30B (A3B)", "specialized"
  context: { type: DataTypes.STRING },                    // "128K", "512 tokens"
  capabilities: { type: DataTypes.JSON, defaultValue: [] },
  description: { type: DataTypes.STRING },
  chatReady: { type: DataTypes.BOOLEAN, defaultValue: false },
  free: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = AiModel;
