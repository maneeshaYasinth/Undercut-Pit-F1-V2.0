# 🏎️ UndercutPit F1 (v2.0)

This repository contains the backend for **UndercutPit F1**, a Formula 1 stats and prediction platform.

Note: the frontend has been rebranded to **"Sector 3"** (frontend-only change). The backend and API remain under the `UndercutPit F1` project name.

The backend is built with **Node.js, Express, JWT authentication, and Ergast F1 API integration**.

---

## 📌 Features

- ✅ **User Authentication** (JWT Access + Refresh Tokens)
- ✅ **Secure Routes** protected with middleware
- ✅ **Race Results API** (fetched from Ergast API)
- ✅ **Constructor Standings API**
- ✅ **Driver Predictions & Leaderboard** 
- ✅ **Error Handling** with clean responses
- ✅ **ML Interrgation** try to make a prediction model

More details:

- **User Authentication:** registration and login endpoints that return JWT tokens. Tokens are used to protect routes and identify users. Passwords are hashed with `bcryptjs`.
- **Roles & Admins:** Admin accounts can be created via admin endpoints; admin tokens include an `isAdmin` flag used by `authAdmin` middleware to protect admin-only routes.
- **Prediction System:** endpoints to create and submit predictions; a leaderboard aggregates scores from the `Score` model. Predictions and scoring are stored in MongoDB.
- **Race & Qualifying Results:** results are fetched from the Ergast API and exposed through the backend endpoints; results can also be submitted manually via protected routes (useful for race admins).
- **Constructor & Driver Standings:** endpoints that return current standings (fetched or computed) and are used by the frontend to populate championship pages.
- **Error Handling & Validation:** controllers return structured error messages; middleware validates auth and admin permissions.

Frontend & local development:

- The frontend has been rebranded to **"Sector 3"**. It lives in the `frontend/` folder and is a Vite + React app.
- To run locally (backend): install dependencies and start the server. Example (PowerShell):

```powershell
cd backend; npm install; npm run dev
```

- To run the frontend (Sector 3):

```powershell
cd frontend; npm install; npm run dev
```

Security note:

- Keep `JWT_SECRET` and any database credentials in a `.env` file (not checked into source control). Access tokens are short-lived and can be refreshed using the refresh token flow implemented in the backend.

Frontend (Sector 3) — user-facing features
-----------------------------------------

Implemented features (what users can do today):

- **User accounts:** register, login, and persist session via JWT stored in `localStorage`.
- **Prediction flow:** create and submit race predictions through the `PredictionForm` page.
- **Leaderboard & scoring:** view the leaderboard and personal score history, driven by the `Score` model.
- **Race & qualifying results pages:** view official results and manually submitted results (admin) on `RaceResults` and `QuliResult` pages.
- **Championship pages:** driver and constructor standings pages display the current season information.
- **News feed & Team Radio:** read news items and listen to team radio clips via the `News` and `TeamRadio` components.
- **Responsive UI & media:** hero background video on the home page, responsive layout and navigation, and themed components.
- **Admin UI:** protected pages (e.g., `SubmitResult`) for admins to add or correct race results.

Planned / optional features (what the frontend can be extended to provide):

- **Live updates:** WebSocket or polling support to push live race updates and leaderboard changes.
- **Notifications:** in-app toasts and push/desktop notifications for race start, result posts, and prediction deadlines.
- **Profile & statistics:** richer user profile pages with historical stats, prediction accuracy, and badges.
- **Filters & search:** advanced filters for drivers, races, and seasons; quick search for drivers/constructors.
- **Offline & caching:** service-worker based caching for faster repeat loads and limited offline viewing of last-fetched data.
- **Localization & accessibility:** multi-language support and improved ARIA/accessibility coverage.
- **Social sharing & export:** share predictions or leaderboards to social networks and export personal stats as CSV.

If you want, I can move some of the planned items into concrete issues or implement any specific feature next (e.g., add live updates or notifications). 

---

## ⚙️ Tech Stack

- **Node.js** + **Express**
- **JWT** (`jsonwebtoken`)
- **cookie-parser**
- **dotenv**
- **axios** (for F1 API requests)

---