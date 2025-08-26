from fastapi import APIRouter, Depends, HTTPException, status, Request
from typing import Dict, Callable
from sqlalchemy.orm import Session
from datetime import timedelta

from app.models.auth_models import User




# ---- Role-based dashboard handlers ----
def admin_dashboard() -> Dict:
    return {"status": 200, "message": "Welcome to Admin dashboard 🚀"}


def doctor_dashboard() -> Dict:
    return {"status": 200, "message": "Welcome to Doctor dashboard 🩺"}


def patient_dashboard() -> Dict:
    return {"status": 200, "message": "Welcome to Patient dashboard 👤"}


def delivery_dashboard() -> Dict:
    return {"status": 200, "message": "Welcome to Delivery dashboard 🚚"}


def pharmacy_dashboard() -> Dict:
    return {"status": 200, "message": "Welcome to Pharmacy dashboard 💊"}


# ---- Role -> Function mapping ----
ROLE_DASHBOARD_MAP: Dict[int, Callable[[], Dict]] = {
    1: admin_dashboard,
    2: doctor_dashboard,
    3: patient_dashboard,
    4: delivery_dashboard,
    5: pharmacy_dashboard,
}


# ---- Service: Fetch dashboard based on role ----
async def role_based_dashboard_service(db: Session, current_user: Dict) -> Dict:
    try:
        role_id = current_user.get("role_id") if current_user else None
        if not role_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or missing role_id in user session",
            )
        
        dashboard_func = ROLE_DASHBOARD_MAP.get(role_id)
        if not dashboard_func:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"No dashboard available for role_id={role_id}",
            )

        return dashboard_func()

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch dashboard data: {str(e)}",
        )