from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    COGNEE_SERVICE_URL: str
    COGNEE_API_KEY: str
    MEMZEE_DATASET: str = "memzee"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()