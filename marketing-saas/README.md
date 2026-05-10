# Marketing SaaS

Next.js + Express demo for a marketing SaaS dashboard.

## Requirements

- Node.js 18.17 or newer
- npm 9 or newer

## One-click Windows startup

For the simplest local startup on Windows:

1. Open the `marketing-saas` folder in File Explorer.
2. Double-click `start-dev.bat`.
3. On the first run, the script installs dependencies with `npm install` if `node_modules` is missing.
4. The script opens two independent CMD windows:
   - `Marketing SaaS Backend - localhost 4000`
   - `Marketing SaaS Frontend - localhost 3000`
5. Keep both CMD windows open while using the project.
6. Stop the project by closing both CMD windows or pressing `Ctrl + C` in each one.

## Demo login

Use these demo credentials in the frontend login form:

- Email: `demo@marketing-saas.local`
- Password: `password`

The demo backend accepts any non-empty email and password, but the values above are pre-filled in the UI for convenience.

## Local links

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:4000>
- Health check: <http://localhost:4000/api/health>

## Manual install

If you prefer running commands manually:

```bash
cd marketing-saas
npm install
```

## Manual development startup

Run both services together in one terminal:

```bash
npm run dev
```

Or run each service in a separate terminal:

```bash
npm run dev:backend
npm run dev:frontend
```

The backend runs on `localhost:4000`, and the frontend runs on `localhost:3000`.

## Production build check

```bash
npm run build
```
