

from pydantic_settings import BaseSettings
from dotenv import load_dotenv


load_dotenv()

class AppConfig(BaseSettings):
    google_ai_api_key: str
    app_host: str
    app_port: int
    path_data: str


app_config = AppConfig()

GOOGLE_API_KEY = app_config.google_ai_api_key
APP_HOST = app_config.app_host
APP_PORT = app_config.app_port
PATH_DATA = app_config.path_data
