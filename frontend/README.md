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
Vercel rewrites application routes to `index.html` so React Router routes work
when opened directly or refreshed.

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Available routes

- `/` - Home page
- `/register/donor` - Donor registration
- `/register/hospital` - Hospital registration
- `/sign-in` - Sign in
- `/profile` - Role-based profile redirect
- `/donor/profile` - Donor profile form
- `/hospital/profile` - Hospital profile and verification document
- `/admin/profile` - Administration and hospital applications
- `/access-denied` - Unauthorized role fallback
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
- visible required-field indicators;
- password visibility controls;
- email normalization before form submission;
- loading and disabled states for authentication forms;
- backend registration and sign-in integration;
- authentication state and session restoration;
- reusable validation, error, success, and loading feedback;
- protected routes and role-based profile redirection;
- donor profile creation and editing;
- hospital profile creation and editing;
- protected admin profile with pending hospital applications;
- shared country, region, and city profile fields;
- international phone-number validation;
- hospital verification status display;
- hospital license selection, validation, and upload UI;
- logout from donor and hospital profiles;
- placeholders for future donor and hospital blood-request functionality.

The admin hospital-application tabs load pending, approved, and rejected
hospitals and support the currently available hospital details, license preview
or link, approve and reject actions, and manual list refresh.

The donor profile currently supports full name, location, blood type, plasma
availability, last donation date, the explicit `has_never_donated` state, and
an optional phone number.

The hospital profile currently supports organization name and type, a custom
organization type, address, location, representative name, contact email, and
phone number. All hospital profile fields are required by the current frontend
validation. License files are limited to PDF, JPG/JPEG, or PNG files up to
10 MB.

The registration password must contain at least eight characters, including
one uppercase English letter, one lowercase English letter, one number, and
one special character.
