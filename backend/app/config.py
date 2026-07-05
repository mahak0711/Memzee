from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    LLM_API_KEY: str
    COGNEE_SERVICE_URL: str
    COGNEE_API_KEY: str
    MEMZEE_DATASET: str = "main_dataset"
    SUPADATA_API_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()