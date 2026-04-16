# SuperSnippets

SuperSnippets is a full-stack codebook generation platform for competitive programmers and teams. It helps users collect source files from GitHub and local uploads, organize them into categories, collaborate with others, and generate PDF-ready codebooks with configurable formatting.

This repository is a monorepo with:
- `frontend/`: Next.js application (UI, auth flow, dashboard/editor)
- `backend/`: Express + MongoDB API (auth, GitHub ingestion, codebook management, parser, notifications, PDF prep)

## Table of Contents

- [Key Features](#key-features)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Development Setup](#local-development-setup)
- [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Data Model Highlights](#data-model-highlights)
- [Testing and Validation](#testing-and-validation)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [License](#license)

## Key Features

- User authentication
- Email/password signup and login
- Google OAuth sign-in via NextAuth + backend user sync
- Password reset flow with email verification code

- Codebook initialization workflow
- Add one or multiple GitHub repositories
- Upload local code files
- Configure layout constraints before generation

- GitHub repository ingestion
- Fetch repository files via GitHub API and raw content endpoints
- Filter for common competitive programming file types (`.cpp`, `.c`, `.cc`, `.h`, `.hpp`, `.java`, `.py`)

- Collaborative codebooks
- Invite users to collaborate via notifications
- Accept invitations and auto-add collaborators to a codebook

- Editor and organization
- Browse/edit code segments
- Organize files into categories
- Persist editor/codebook state via utility handlers and backend storage

- PDF generation pipeline
- Build LaTeX source from categories + code segments
- Compile PDF through `latexonline.cc`
- Download generated PDF from the editor

- Similarity parser utility
- AST-based similarity checks using `tree-sitter` (C++ parser currently configured)

## Architecture Overview

1. Frontend (`frontend/`) handles user-facing flows: landing page, auth, initialization wizard, dashboard, and editor.
2. Frontend API wrappers call backend REST endpoints (mostly under `/api/*` on backend).
3. Backend (`backend/`) validates requests, runs business logic, and persists to MongoDB.
4. GitHub and email integrations are handled server-side using `octokit` and `nodemailer`.
5. PDF output is generated from server-built LaTeX and compiled by an external LaTeX service.

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- NextAuth v5 (beta)
- Tailwind CSS 4
- Framer Motion (`motion` package)
- PrismJS + `react-simple-code-editor`

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- Octokit (GitHub API)
- Nodemailer (Gmail transporter)
- Tree-sitter + `tree-sitter-cpp`
- Archiver (TAR creation for LaTeX pipeline)

## Repository Structure

```text
SuperSnippets/
  backend/
    server.js
    src/
      app.js
      config/
      controllers/
      routes/
      services/
      models/
      utils/
  frontend/
    src/
      app/
      providers/
      utility/
      auth.js
  LICENSE
```

## Prerequisites

- Node.js 20+ recommended
- npm 9+
- MongoDB instance (local or cloud)
- GitHub personal access token for repository API access
- Gmail account + app password for mail delivery (welcome/reset)
- Google OAuth credentials for Google sign-in

## Environment Variables

Create env files in `backend/` and `frontend/`.

### Backend (`backend/.env`)

```env
PORT=8000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxx
EMAIL_APP_USER=your-email@gmail.com
EMAIL_APP_PASS=your-app-password
```

Notes:
- `PORT` is required by `backend/server.js`.
- `MONGO_URI` is required by `backend/src/config/db.js`.
- `EMAIL_APP_USER` and `EMAIL_APP_PASS` are used by `backend/src/services/email.service.js`.

### Frontend (`frontend/.env.local`)

```env
BACKEND_URL=http://localhost:8000
GOOGLE_CLIENT_ID=xxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxx
AUTH_SECRET=replace-with-a-long-random-secret
NEXTAUTH_URL=http://localhost:3000
```

Notes:
- `BACKEND_URL` is used in `frontend/src/auth.js` and auth-related route handlers.
- Google vars are required for the Google provider in NextAuth.
- `AUTH_SECRET` (or `NEXTAUTH_SECRET`) is recommended for stable auth sessions.

## Local Development Setup

From repository root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running the App

Use two terminals.

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

Backend should start on `http://localhost:8000` (or your configured `PORT`).

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Frontend should start on `http://localhost:3000`.

## API Reference

Base backend prefix: `/api`

### Health Check
- `GET /`
  - Returns server status and timestamp.

### Auth (`/api/auth`)
- `POST /signup`
- `POST /login`
- `POST /google`
- `POST /forgot-password`
- `POST /verify-reset-code`
- `POST /reset-password`

### PDF and Codebook (`/api/pdf`)
- `POST /generate` - Compile and return PDF
- `POST /create` - Create codebook/config document
- `PATCH /modify` - Update codebook fields
- `GET /fetch/:codebookId` - Fetch full codebook
- `GET /collaborators/:codebookId` - List collaborators
- `POST /add-collaborator`
- `POST /remove-collaborator`
- `GET /user-codebooks/:userId`
- `DELETE /delete-codebook/:codebookId`

### GitHub (`/api/github`)
- `POST /fetch` - List code files from repository
- `POST /file` - Fetch single file content
- `POST /fetch-all` - Fetch and normalize all code files

### Notifications (`/api/notifications`)
- `POST /invite`
- `POST /accept`
- `POST /` - Fetch notifications for a user

### Activity (`/api/activities`)
- `POST /log`
- `GET /:codebookId`

### Parser (`/api/parser`)
- `POST /` - Run similarity checks on snippets

### Email (`/api/email`)
- `POST /welcome`

## Data Model Highlights

### `User`
- Profile fields (`name`, `email`, `image`)
- Password or Google auth identity (`password`, `googleId`)
- Password reset metadata (`passwordResetCode`, `passwordResetExpires`)
- Linked codebooks (`codebooksID`)

### `Codebook`
- Ownership and collaboration (`owner`, `collaborators`)
- Embedded configuration document
- Embedded code segments and categories
- Tracked repository list

### `Notification`
- Invitation notifications with sender/recipient/status
- Metadata includes codebook references

### `Activity`
- Codebook activity log with create/update/delete snapshots

## Testing and Validation

Current scripts are minimal and mostly manual.

### Backend scripts
- `npm run dev` - run backend with nodemon
- `npm start` - run backend once

### Frontend scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

### Manual backend test files
- `backend/test-github.js` - tests GitHub fetch endpoint
- `backend/testscript.js` - tests repository fetch + DB connectivity

## Troubleshooting

- Backend fails at startup with Mongo error
  - Ensure `MONGO_URI` is set in `backend/.env`.

- Backend starts but no port binding
  - Ensure `PORT` is set in `backend/.env`.

- GitHub fetch endpoints fail
  - Ensure `GITHUB_TOKEN` is present and valid.
  - Confirm repository URL format is valid GitHub repo URL.

- Email/reset flow fails
  - Verify `EMAIL_APP_USER` and `EMAIL_APP_PASS`.
  - Use a Gmail app password, not your regular account password.

- Google login fails
  - Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `frontend/.env.local`.
  - Verify OAuth redirect settings in your Google Cloud console.

- Frontend cannot reach backend
  - Ensure backend is running on expected host/port.
  - Set `BACKEND_URL` in frontend env.

- Port mismatch warning
  - `frontend/src/utility/constants.js` currently hardcodes backend base as `http://localhost:8000/api`.
  - If backend runs on another port, update this constant (or refactor to env-driven API base).

## Future Improvements

- Add unified workspace-level scripts for running frontend and backend together
- Add automated tests (unit/integration/e2e)
- Add API schema docs (OpenAPI/Swagger)
- Add auth middleware for protected backend routes
- Move hardcoded frontend API base to env configuration consistently
- Add CI pipeline (lint, tests, build checks)

## License

This project is licensed under the terms in `LICENSE`.
