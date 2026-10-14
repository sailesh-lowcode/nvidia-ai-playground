// NVIDIA inference provider abstraction.
// Supports two backends (first match wins):
//   1. NVIDIA_API_KEY   -> direct https://integrate.api.nvidia.com/v1
//   2. API_RAILS_KEY    -> via your API Rails workspace (nvidia connector)
//   3. demo mode        -> no key: returns an explanatory canned answer so the
//                          UI still works end-to-end.

const axios = require("axios").default;

const DIRECT_BASE = "https://integrate.api.nvidia.com/v1";
const API_RAILS_BASE = process.env.API_RAILS_ENDPOINT || "https://api.apirails.com";

function mode() {
  if (process.env.NVIDIA_API_KEY) return "direct";
  if (process.env.API_RAILS_KEY) return "apirails";
  return "demo";
}

async function chatCompletion(model, messages, { temperature = 0.6, maxTokens = 1024 } = {}) {
  const m = mode();

  if (m === "demo") {
    return {
      demo: true,
      content:
        `[demo mode] I'm ${model}. No NVIDIA credentials configured on the server.\n` +
        `Set NVIDIA_API_KEY (from https://build.nvidia.com) or API_RAILS_KEY in server/.env, ` +
        `restart, and ask again — this exact card will then stream a real answer.`,
    };
  }

  const url = m === "direct" ? `${DIRECT_BASE}/chat/completions` : `${API_RAILS_BASE}/nvidia/v1/chat/completions`;
  const key = m === "direct" ? process.env.NVIDIA_API_KEY : process.env.API_RAILS_KEY;

  const { data } = await axios.post(
    url,
    { model, messages, temperature, max_tokens: maxTokens, stream: false },
    { headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, timeout: 120000 }
  );

  return { content: data.choices?.[0]?.message?.content ?? "", usage: data.usage ?? null };
}

module.exports = { chatCompletion, mode };
