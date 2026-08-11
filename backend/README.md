# Backend — Blood Donation Finder

FastAPI + PostgreSQL. See `Backend_Auth_API_DB_Design_UA.docx` for the full auth/DB design and the FE/BE/QA contract doc for the finalized endpoint shapes.

## Local development

```bash
cp .env.example .env   # fill in JWT_SECRET_KEY at minimum
cd ..
docker-compose up --build
```

API available at `http://localhost:8000`, docs at `http://localhost:8000/docs`.

The `postgres` service in `docker-compose.yml` is local-dev only — production connects to Supabase directly via `DATABASE_URL` (see `.env.example`).

## Migrations

```bash
cd backend
alembic revision --autogenerate -m "message"
alembic upgrade head
```

## Notes

- Access token: returned in the JSON body (`access_token`, `expires_in`), kept in frontend memory.
- Refresh token: set as an HttpOnly cookie (`refresh_token`, path `/api/v1/auth`), rotated on every `/auth/refresh` call and revoked on `/auth/logout`. Rotation state is tracked in the `refresh_tokens` Postgres table — no Redis dependency.
- All error responses use the `{ "error": { "code", "message", "fields"? } }` envelope.
- `RATE_LIMITED` (429) is defined in the error contract but not enforced yet — depends on Redis, which is deferred.
