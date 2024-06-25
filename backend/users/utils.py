from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union
import jwt

SECRET_KEY = "16/09/2003"

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTE = 30

pwd_context =CryptContext(schemes=["bcrypt"],deprecated="auto")

def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)




