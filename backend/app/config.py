from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    COGNEE_SERVICE_URL: str
    COGNEE_API_KEY: str
    MEMZEE_DATASET: str = "memzee"

    class Config:
        env_file = ".env"


settings = Settings()