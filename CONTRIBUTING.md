# 📖 Project Guidelines & Git Rules

Welcome to the **Blood Donation Finder** project! Please follow these guidelines before creating branches or submitting code.

---

## 🌿 Branch Naming Convention

All branch names must follow this format:

* **Features:** `feature/short-description` or `feature/JIRA-ID-description` *(e.g., `feature/donor-map`, `feature/BLOOD-12-login`)*
* **Bug Fixes:** `fix/issue-description` *(e.g., `fix/header-mobile-view`)*
* **Hotfixes:** `hotfix/critical-issue` *(e.g., `hotfix/crash-on-submit`)*
* **Documentation:** `docs/update-readme`

---

## 💬 Commit Message Convention

We follow the **Conventional Commits** specification:

* `feat:` add donor registration form *(for new features)*
* `fix:` resolve database connection timeout *(for bug fixes)*
* `docs:` update CONTRIBUTING.md *(for documentation)*
* `style:` format button component *(for formatting, missing semi-colons, etc.)*
* `refactor:` simplify user auth logic *(for code refactoring)*
* `chore:` update dependencies *(for build tasks, config updates)*

---

## 🔀 Pull Request (PR) Rules

1. **No direct pushes:** Direct pushes to `main` or `develop` are strictly prohibited.
2. **Base Branch:** All PRs must be created against the `develop` branch (not `main`).
3. **PR Approval:** Every PR requires at least **1 approval** before merging.
4. **Clear Description:** Provide a clear title and a short summary of what was changed in your PR.
5. **PR Clean-up:** Please delete your working branch after merging your PR to keep the repository clean.

---

## 🛡️ Security Rules

* 🛑 **No Secrets Policy:** Never commit `.env` files, API keys, credentials, or passwords into the repository. All secrets must be set up via **Environment Variables** directly in Vercel / Render.
