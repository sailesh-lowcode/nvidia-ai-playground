# 🤖 NVIDIA Free Models — AI Playground

Query **80 free NVIDIA-hosted AI models** from one clean UI: ask a single
model, or fire your question at every chat model and watch the answers roll
in one by one. Browse the full catalog with specs for every model.

## Features

### 💬 Chatbot tab
- **Ask one model** — pick any chat-ready model from the dropdown, submit your
  question, get the answer (with response time).
- **Ask ALL models** — your question is sent to every chat-capable free model
  (~50). Each model answers **one by one**, streaming into a **4-per-row card
  grid** with live status dots, typing indicators, per-card timing and a
  progress bar. Stop button included.

### 🧠 Models tab
- All **80 free models** with category filters (chat, code, vision & video,
  omni, embeddings, safety, translation, document parsing, domain) + search.
- Click any model → full detail modal: model ID, publisher, parameters,
  context length, capabilities, endpoint, and pricing.

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite 5 |
| Backend | Node.js + Express |
| Database | SQLite via Sequelize (catalog auto-seeded on boot) |
| AI | NVIDIA NIM API (`/v1/chat/completions`) — direct key **or** via API Rails |

## Setup

```bash
# 1) backend
cd server
cp .env.example .env      # add NVIDIA_API_KEY  (or API_RAILS_KEY)
npm install
npm run dev               # API on http://localhost:4000 (seeds SQLite on boot)

# 2) frontend (new terminal)
cd client
npm install
npm run dev               # UI on http://localhost:5173 (proxies /api → :4000)
```

Production build: `cd client && npm run build`, then `cd server && npm start`
serves the built UI from the same origin on port 4000.

### Credentials (server/.env) — pick one
- `NVIDIA_API_KEY` — your key from https://build.nvidia.com (free credits)
- `API_RAILS_KEY` + `API_RAILS_ENDPOINT` — route calls through an API Rails
  workspace with the NVIDIA connector attached

Without a key the app runs in **demo mode**: every request succeeds with an
explanatory answer, so the full UX stays testable.

## API

| Route | Description |
|---|---|
| `GET /api/models` | all free models (`?category=`, `?chatReady=1`) |
| `GET /api/models/categories` | category → count summary |
| `GET /api/models/:id` | one model with full specs |
| `POST /api/chat` | `{model, question}` → single answer |
| `GET /api/chat/all?question=` | SSE stream — every chat model answers one by one |
| `GET /api/health` | status + active provider |

## Notes

- The model catalog was fetched **live** from the NVIDIA NIM `GET /v1/models`
  endpoint (80 models) and curated with specs from public model cards.
- Catalog is cached in SQLite and auto-seeded/refreshed on server boot
  (idempotent upsert).
- `.env` is gitignored — never commit credentials.
