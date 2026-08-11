from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    environment: str = "local"  # "local" | "production" — drives cookie Secure/SameSite flags

    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

    consent_policy_version: str = "v1.0"

    refresh_cookie_name: str = "refresh_token"
    refresh_cookie_path: str = "/api/v1/auth"

    # Comma-separated list, e.g. "https://blood-donation-finder.vercel.app,http://localhost:5173"
    # Must be explicit origins, not "*" — the refresh cookie requires credentials support in CORS.
    cors_allowed_origins: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_allowed_origins.split(",") if origin.strip()]

    @property
    def is_production(self) -> bool:
        return self.environment == "production"


settings = Settings()
