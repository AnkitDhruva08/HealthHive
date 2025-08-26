# utils/jwt.py

import os
from datetime import datetime, timedelta, UTC
from jose import jwt, JWTError
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from typing import Annotated
from starlette import status
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

# Load environment variables
load_dotenv()

# Password hashing context (for user password hashing/verification)
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 Bearer setup
oauth_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

# ✅ JWT settings
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY not set in environment variables")

ALGORITHM = os.getenv("ALGORITHM", "HS256")

# Expiry times
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day
REFRESH_TOKEN_EXPIRE_DAYS = 7  # 7 days


# ✅ Create an access token (short-lived, used for authentication)
def create_access_token(username: str, user_id: int, expires_delta: timedelta = None):
    to_encode = {
        "sub": username,
        "id": user_id,
        "type": "access",
    }
    expire = datetime.now(UTC) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ✅ Create a refresh token (longer-lived, used to issue new access tokens)
def create_refresh_token(username: str, user_id: int, expires_delta: timedelta = None):
    to_encode = {
        "sub": username,
        "id": user_id,
        "type": "refresh",
    }
    expire = datetime.now(UTC) + (expires_delta or timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ✅ Decode and validate any JWT token
def decode_jwt_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )


# ✅ Check if an access token is expired
def token_expired(token: Annotated[str, Depends(oauth_bearer)]):
    payload = decode_jwt_token(token)

    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type. Expected access token.",
        )

    exp = datetime.fromtimestamp(payload["exp"], UTC)
    if exp <= datetime.now(UTC):
        return True  # expired
    return False

