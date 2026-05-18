import os
import logging
from dotenv import load_dotenv
import psycopg

load_dotenv()
logger = logging.getLogger(__name__)

def get_connection():
    try:
        return psycopg.connect(
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST'),
            port=os.getenv('DB_PORT')
        )
    except Exception:
        logger.exception("Database connection failed")