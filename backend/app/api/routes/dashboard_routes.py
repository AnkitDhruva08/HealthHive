import os
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
import httpx
from datetime import timedelta

from app.db.database import get_db
from app.models.auth_models import User
from app.services.auth_services import get_authenticated_user
import app.services.dashboard_services as dashboard_services

router = APIRouter()

@router.get("/dashboard")
async def role_based_dashboard_routes(db: Session = Depends(get_db), current_user: User = Depends(get_authenticated_user)):
    try:
        result = await dashboard_services.role_based_dashboard_service(db, current_user)
        return result
    
    except Exception as e:
        raise HTTPException(status_code=500, details=f"Failed to fecth dashboar data")




