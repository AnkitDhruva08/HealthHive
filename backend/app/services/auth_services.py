import os
from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from fastapi.security import OAuth2PasswordBearer
from typing import Dict
from jose import jwt, JWTError
from app.utils.security import hash_password, verify_password
from app.models.auth_models import User, Role
from app.schemas.auth_schemas import UserRegistrationRequest, LoginRequest
from app.utils.jwt_token import create_access_token, create_refresh_token, decode_jwt_token
from datetime import timedelta


from app.db.database import get_db
from dotenv import load_dotenv  # secret key, algorithm

# OAuth2 scheme to read token from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
# ✅ JWT settings
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY not set in environment variables")

ALGORITHM = os.getenv("ALGORITHM", "HS256")

load_dotenv()

async def auth_register_service(payload: UserRegistrationRequest, db: Session):
    """
    Register a new user:
    - Validate unique fields
    - Hash password & save user
    - Return user info with access + refresh tokens
    """

    try:
        # ✅ Check unique constraints
        if db.query(User).filter(User.email == payload.email).first():
            raise HTTPException(status_code=400, detail="Email already exists")
        if db.query(User).filter(User.phone == payload.phone).first():
            raise HTTPException(status_code=400, detail="Phone number already exists")

        if payload.role == 2 and payload.license_number:
            if db.query(User).filter(User.license_number == payload.license_number).first():
                raise HTTPException(status_code=400, detail="License number already registered")

        if payload.role == 4 and payload.pharmacy_name:
            if db.query(User).filter(User.pharmacy_name == payload.pharmacy_name).first():
                raise HTTPException(status_code=400, detail="Pharmacy name already registered")

        if payload.role == 5 and payload.vehicle_number:
            if db.query(User).filter(User.vehicle_number == payload.vehicle_number).first():
                raise HTTPException(status_code=400, detail="Vehicle number already registered")

        # ✅ Create and save new user
        new_user = User(
            email=payload.email,
            hashed_password=hash_password(payload.password),
            username=payload.username,
            phone=payload.phone,
            location=payload.location,
            role_id=payload.role,
            license_number=payload.license_number,
            specialization=payload.specialization,
            pharmacy_name=payload.pharmacy_name,
            vehicle_number=payload.vehicle_number,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # ✅ Generate tokens
        access_token = create_access_token(
            username=new_user.email,
            user_id=new_user.id,
            expires_delta=timedelta(minutes=15)
        )
        refresh_token = create_refresh_token(
            username=new_user.email,
            user_id=new_user.id,
            expires_delta=timedelta(days=7)
        )

        return {
            "status": 201,
            "message": "User registered successfully",
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "username": new_user.username,
                "phone": new_user.phone,
                "role": new_user.role_id,
                "is_active": new_user.is_active,
            },
            "tokens": {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer",
            },
        }

    except HTTPException as e:
        # Known validation errors
        raise e
    except Exception as e:
        # Worst-case fallback
        db.rollback()  # rollback to prevent half-commits
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Registration failed: {str(e)}"
        )


# -------------------------Login Service ---------------------------------------------------------------------------
async def auth_login_service(payload: LoginRequest, db: Session):
    """
    Login a user:
    - Validate identifiers (email, username, or phone)
    - Verify password
    - Return user info with access + refresh tokens
    """
    try:
        identifier = payload.identifier.strip()
        password = payload.password

        # 🔍 Check if user exists by email, username, or phone
        user = db.query(User).filter(
            or_(
                User.email == identifier,
                User.username == identifier,
                User.phone == identifier
            ),
            User.is_active == True
        ).first()


        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials. User not found."
            )
        
        # 🔑 Verify password
        if not verify_password(password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials. Incorrect password."
            )
       

        # 🎟️ Generate tokens
        access_token = create_access_token(
            username=user.email,
            user_id=user.id,
            expires_delta=timedelta(minutes=15)
        )
        refresh_token = create_refresh_token(
            username=user.email,
            user_id=user.id,
            expires_delta=timedelta(days=7)
        )

        return {
            "status": 200,
            "message": "Logged in successfully 🎉",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "role": user.role_id
            },
            "tokens": {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer",
            }
        }

    except HTTPException:
        raise  # Re-raise known errors
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )
    


# --------------- get current  authenticated user details and Decode token and return user ------------------------------------
def get_authenticated_user( token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Dict:
    try:
        # 🔹 Decode token
        payload = decode_jwt_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user_id = payload.get("id")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token payload invalid",
            )

        # 🔹 Fetch user with role in one go
        user = (
            db.query(User)
            .options(joinedload(User.role))
            .filter(User.id == int(user_id), User.is_active == True)
            .first()
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or inactive",
            )

        # 🔹 Return user data
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "role_id": user.role_id,
            "role_name": user.role.role_name if user.role else None,
        }

    except HTTPException:
        raise  # Re-raise known errors

    except Exception as e:
        print("❌ Failed to set user session:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get current logged in user"
        )