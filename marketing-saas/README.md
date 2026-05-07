# Marketing SaaS

Next.js + Express demo for a marketing SaaS dashboard.

## Requirements

- Node.js 18.17 or newer
- npm 9 or newer

## Install

```bash
cd marketing-saas
npm install
```

## Development

Run both services together:

```bash
npm run dev
```

Or run each service in a separate terminal:

```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:4000>
- Health check: <http://localhost:4000/api/health>

## Production build check

```bash
npm run build
```
