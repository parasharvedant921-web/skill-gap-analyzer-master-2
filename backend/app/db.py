from pymongo import MongoClient
from .config import settings

client = MongoClient(settings.MONGODB_URL)
db = client[settings.DATABASE_NAME]

def get_db():
    return db
