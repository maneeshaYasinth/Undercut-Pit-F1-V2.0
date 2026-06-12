# 🏎️ UndercutPit F1 (v2.0)

This repository contains the backend for **UndercutPit F1**, a Formula 1 stats and prediction platform.

> **Frontend** has been rebranded to **"Sector 3"** (frontend-only change). The backend and API remain under the `UndercutPit F1` project name.
> **Observability** — a separate monitoring repo [sector3-monitoring](https://github.com/maneeshayasinth/sector3-monitoring) instruments this backend with Prometheus + Grafana on AWS EC2.

The backend is built with **Node.js, Express, JWT authentication, and Ergast F1 API integration**.

---

## 📌 Features

- ✅ **User Authentication** (JWT Access + Refresh Tokens)
- ✅ **Secure Routes** protected with middleware
- ✅ **Race Results API** (fetched from Ergast API)
- ✅ **Constructor Standings API**
- ✅ **Driver Predictions & Leaderboard**
- ✅ **Error Handling** with clean responses
- ✅ **ML Integration** — prediction model (in progress)
- ✅ **Prometheus Metrics** — `/metrics` endpoint exposed via `prom-client` for observability

More details:

- **User Authentication:** registration and login endpoints that return JWT tokens. Tokens are used to protect routes and identify users. Passwords are hashed with `bcryptjs`.
- **Roles & Admins:** Admin accounts can be created via admin endpoints; admin tokens include an `isAdmin` flag used by `authAdmin` middleware to protect admin-only routes.
- **Prediction System:** endpoints to create and submit predictions; a leaderboard aggregates scores from the `Score` model. Predictions and scoring are stored in MongoDB.
- **Race & Qualifying Results:** results are fetched from the Ergast API and exposed through the backend endpoints; results can also be submitted manually via protected routes (useful for race admins).
- **Constructor & Driver Standings:** endpoints that return current standings (fetched or computed) and are used by the frontend to populate championship pages.
- **Error Handling & Validation:** controllers return structured error messages; middleware validates auth and admin permissions.
- **Observability:** the backend exposes a `/metrics` endpoint instrumented with `prom-client`. Heap memory, event loop lag, and active handles are scraped by Prometheus and visualized in Grafana. See [sector3-monitoring](https://github.com/maneeshayasinth/sector3-monitoring) for the full stack.

---

## 🔭 Observability

This backend is instrumented with [`prom-client`](https://github.com/siimon/prom-client) and exposes a `/metrics` endpoint for Prometheus scraping.

The full monitoring stack lives in a separate repo: [sector3-monitoring](https://github.com/maneeshayasinth/sector3-monitoring)

| Tool | Purpose |
|---|---|
| `prom-client` | Exposes Node.js metrics at `/metrics` |
| Prometheus | Scrapes and stores time-series metrics |
| Grafana | Dashboards for heap memory, event loop lag, active handles |
| Node Exporter | Host-level EC2 metrics (CPU, RAM, disk) |

---

## Frontend & local development

- The frontend has been rebranded to **"Sector 3"**. It lives in the `frontend/` folder and is a Vite + React app.
- To run locally (backend):

```powershell
cd backend; npm install; npm run dev
```

- To run the frontend (Sector 3):

```powershell
cd frontend; npm install; npm run dev
```

---

## 🔒 Security note

Keep `JWT_SECRET` and any database credentials in a `.env` file (not checked into source control). Access tokens are short-lived and can be refreshed using the refresh token flow implemented in the backend.

---

## Frontend (Sector 3) — user-facing features

Implemented features:

- **User accounts:** register, login, and persist session via JWT stored in `localStorage`.
- **Prediction flow:** create and submit race predictions through the `PredictionForm` page.
- **Leaderboard & scoring:** view the leaderboard and personal score history, driven by the `Score` model.
- **Race & qualifying results pages:** view official results and manually submitted results on `RaceResults` and `QuliResult` pages.
- **Championship pages:** driver and constructor standings pages display the current season information.
- **News feed & Team Radio:** read news items and listen to team radio clips via the `News` and `TeamRadio` components.
- **Responsive UI & media:** hero background video on the home page, responsive layout and navigation, and themed components.
- **Admin UI:** protected pages (e.g., `SubmitResult`) for admins to add or correct race results.

Planned features:

- Live updates via WebSocket or polling
- In-app notifications for race start, result posts, and prediction deadlines
- Richer user profile pages with historical stats and prediction accuracy
- Advanced filters and search for drivers, races, and seasons
- Service-worker caching for offline viewing
- Multi-language support and improved accessibility
- Social sharing and CSV export of personal stats

---

## ⚙️ Tech Stack

- **Node.js** + **Express**
- **JWT** (`jsonwebtoken`)
- **prom-client** (Prometheus instrumentation)
- **cookie-parser**
- **dotenv**
- **axios** (for F1 API requests)
