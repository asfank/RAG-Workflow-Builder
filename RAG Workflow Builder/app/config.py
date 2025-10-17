from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    OPENAI_API_KEY: str = ""
    VECTOR_STORE_PATH: str = "./data"

    class Config:
        env_file = ".env"


settings = Settings()
