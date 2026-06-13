from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "SentinelIQ"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./sentineliq.db" # Local development database
    AZURE_OPENAI_API_KEY: str = ""
    AZURE_OPENAI_ENDPOINT: str = ""
    FOUNDRY_IQ_ENDPOINT: str = ""

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()
