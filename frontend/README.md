# Blood Donation Finder — Frontend

## Requirements

- Node.js
- npm

## Installation

From the repository root:

```bash
cd frontend
```

Install dependencies using one of these options:

```bash
npm install
```

Use `npm install` for regular local development. It may update `package-lock.json` when dependency versions change.

Or:

```bash
npm ci
```

Use `npm ci` to install the exact dependency versions from `package-lock.json`. You only need to run 1 of these commands

## Development

Start the backend from the repository root before running the frontend. The
local API is available at `http://localhost:8000`, and Vite proxies frontend
requests from `/api` to the local backend.

Create a local environment file from the provided example:

```bash
cp .env.example .env
```

For local development, the default API base path is:

```env
VITE_API_URL=/api/v1
```

For a deployed environment, `VITE_API_URL` must contain the deployed backend
URL ending in `/api/v1`. Deployment environment variables are configured in
Vercel and must not be committed to Git. The local `.env` file is ignored.

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Available routes

- `/` - Home page
- `/register/donor` - Donor registration
- `/register/hospital` - Hospital registration
- `/sign-in` - Sign in
- `/profile` - Authentication test profile
- `/privacy-policy` - Privacy Policy

## Available checks

```bash
npm run lint
npm run build
```

## Current implementation

The current frontend scope includes:

- responsive landing page and navigation;
- mobile navigation menu;
- donor and hospital registration forms;
- sign-in form;
- client-side validation and accessible error messages;
- password visibility controls;
- email normalization before form submission;
- loading and disabled states for authentication forms;
- backend registration and sign-in integration;
- authentication state and session restoration;
- logout and profile redirection.

The registration password must contain at least eight characters, including
one uppercase English letter, one lowercase English letter, one number, and
one special character.

## Current limitations

The profile route is currently a basic authentication test page. Full donor,
hospital, and admin profiles, hospital verification management, and protected
role-based navigation are outside the current frontend scope.
