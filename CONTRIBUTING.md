# Project Guidelines & Git Rules

Welcome to the **Blood Donation Finder** project! Please follow these guidelines before creating branches or submitting code.

---

## Branch Naming Convention

All branch names must follow this format:

- **Features:** `feature/short-description` or `feature/JIRA-ID-description` (e.g., `feature/donor-map`, `feature/BLOOD-12-login`)
- **Bug Fixes:** `fix/issue-description` (e.g., `fix/header-mobile-view`)
- **Hotfixes:** `hotfix/critical-issue` (e.g., `hotfix/crash-on-submit`)
- **Documentation:** `docs/update-readme`

---

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat: add donor registration form` (for new features)
- `fix: resolve database connection timeout` (for bug fixes)
- `docs: update CONTRIBUTING.md` (for documentation)
- `style: format button component` (for formatting, missing semi-colons, etc.)
- `refactor: simplify user auth logic` (for code refactoring)
- `chore: update dependencies` (for build tasks, config updates)

---

## Pull Request (PR) Rules

1. **No direct pushes** to `main` or `develop`.
2. All development work must be merged into `develop` via Pull Request.
3. Every PR requires at least **1 approval** before merging.
4. Provide a clear title and short description of what was changed in your PR.
