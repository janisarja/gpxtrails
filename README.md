# GPXTrails

GPXTrails is a work‑in‑progress project for sharing and working with GPX trail data in a clean, user‑friendly way. The goal of the project is to make it easier for runners, hikers and outdoor enthusiasts to find and share trail information, while also serving as a demonstration of modern full‑stack development practices.

## What It Does (So Far)

Current functionality includes:

* GPX upload/download and parsing
* Interactive map for editing trails
* Trail database

Planned features include:

* Trail filtering and search
* Advanced editing features
* User authentication

---

## Tech Stack

* **Frontend:** React, Next.js
* **Backend:** Next.js
* **Database:** PostgreSQL
* **Mapping / Geo:** Leaflet, React Leaflet, Leaflet.Editable
* **Styling:** Tailwind CSS

---

## Getting Started (Development)

Clone the repository
```
git clone https://github.com/janisarja/gpxtrails.git
```

Install dependencies
```
npm install
```

Run the development server
```
npm run dev
```

---

## Database Setup

This project expects a PostgreSQL database named `trails_db` and the `postgres` user; the password and host are provided via environment variables (see below).

Quick steps (Windows / macOS / Linux):

- Install PostgreSQL: https://www.postgresql.org/download/
- Create the database (example using the `postgres` superuser):

Command-line:
```
psql -U postgres -c "CREATE DATABASE trails_db;"
```

If the `postgres` user has no password set, set one (replace `yourpassword`):

```
psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'yourpassword';"
```

If you prefer a dedicated DB user, create one and grant privileges to `trails_db`.

## Environment variables

Create a `.env.local` file in the project root (this file is ignored by git) and add the following values:

```
DB_HOST=localhost
DB_PASSWORD=yourpassword
```

- `DB_HOST` should point to your Postgres host (e.g. `localhost` or a remote host).
- `DB_PASSWORD` is the password for the `postgres` user (or whatever DB user the app connects as).
