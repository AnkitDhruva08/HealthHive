import os
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from dotenv import load_dotenv

from app.db.database import get_db
from app.models.auth_models import Role, User
from app.schemas.auth_schemas import (
    UserRegistrationRequest,
    RoleResponse,
    LoginRequest
)

import app.services.auth_services as auth_services

load_dotenv()


router = APIRouter()


# Roles
@router.get("/roles", response_model=List[RoleResponse])
def get_roles(db: Session = Depends(get_db)):
    roles = db.query(Role).all()
    if not roles:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No roles found"
        )
    return roles



@router.post("/auth/register/")
async def auth_register_route( payload: UserRegistrationRequest, db: Session = Depends(get_db)):
    try:
        result = await auth_services.auth_register_service(payload, db)
        return result

    except HTTPException as e:
        # re-raise service level exceptions so frontend gets proper error code + message
        raise e
    except Exception as e:
        # fallback for unexpected errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to register to the platform"
        )



@router.post("/auth/login")
async def auth_login_routes(payload: LoginRequest, db: Session = Depends(get_db)):
    try:
        result = await auth_services.auth_login_service(payload, db)
        return result
    
    except HTTPException as e:
        # re-raise service level exceptions so frontend gets proper error code + message
        raise e
    except Exception as e:
        # fallback for unexpected errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to login to the platform"
        )



