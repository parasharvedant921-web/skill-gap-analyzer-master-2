from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Skill Gap Analyzer"
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "skill_gap_db"

    class Config:
        env_file = ".env"

settings = Settings()
