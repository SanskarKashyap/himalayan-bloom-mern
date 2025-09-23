# MERN Stack Boilerplate

This project bootstraps a production-ready MERN (MongoDB, Express, React, Node.js) stack with sensible defaults for both the API and client applications.

## Project Structure

```
.
├── client/   # Vite + React front-end
├── server/   # Express + Mongoose back-end
├── package.json
└── README.md
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
   This installs the root tooling (`concurrently`) and the workspace dependencies (`client` and `server`).

2. **Configure environment variables**
   - Copy the provided examples and adjust as needed:
     ```bash
     cp server/.env.example server/.env
     cp client/.env.example client/.env
     ```
   - Update the values (e.g. MongoDB connection string) before running locally.

3. **Start the development servers**
   ```bash
   npm run dev
   ```
   - API: http://localhost:5000
   - Web: http://localhost:5173 (proxied `/api` requests are forwarded to the API)

4. **Build the client for production**
   ```bash
   npm run build
   ```

## API Overview

The Express server exposes a REST API under `/api`. Example routes include:

- `GET /health` — basic uptime check.
- `GET /api/users` — fetch all users stored in MongoDB.
- `POST /api/users` — create a new user (`name`, `email`).

Update `server/src/routes` and `server/src/controllers` to add new endpoints. MongoDB models live in `server/src/models`.

## Front-end Overview

The React client uses Vite for fast development and includes:

- A sample form for creating users via the API.
- Global configuration via `VITE_API_BASE_URL` allowing easy environment switching.
- A development proxy (`vite.config.js`) forwarding `/api` requests to the Express server.

Extend the app by adding components inside `client/src` and calling your API via the provided base URL.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Runs both Express and Vite dev servers concurrently. |
| `npm run server` | Runs only the Express dev server. |
| `npm run client` | Runs only the Vite dev server. |
| `npm run build` | Builds the React client for production. |

## Next Steps

- Add authentication, validation, and testing to match your project requirements.
- Configure linting/formatting tools (e.g. ESLint, Prettier) beyond the provided placeholder script.
- Containerize the stack or set up deployment workflows as needed.

Enjoy building with the MERN stack!
