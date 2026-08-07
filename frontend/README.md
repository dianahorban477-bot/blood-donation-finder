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

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Available routes

- `/` - Home page
- `/register/donor` - Donor registration
- `/register/hospital` - Hospital registration
- `/sign-in` - Sign in

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
- loading and disabled states for registration forms.

The registration password must contain at least eight characters, including one uppercase English letter, one lowercase English letter, and one number.

## Current limitations

The backend API is not connected yet. Registration and sign-in forms only validate entered data and do not create accounts or authenticate users. Tokens, profile redirection, hospital verification and role-based permissions will be added with backend integration.
