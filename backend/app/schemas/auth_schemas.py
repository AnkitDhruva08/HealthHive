
from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime


# ------------------Schemas for role -----------------------------------------
class RoleBase(BaseModel):
    role_name: str
    is_active: Optional[bool] = True


class RoleCreate(RoleBase):
    """Schema for creating a new role"""
    pass


class RoleUpdate(BaseModel):
    role_name: Optional[str] = None
    is_active: Optional[bool] = None


class RoleResponse(RoleBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True






# -----------------user schemas -----------------------------------------------------------------


class GoogleToken(BaseModel):
    """Schema for Google OAuth token."""
    token: str

class GoogleUser(BaseModel):
    """Schema for Google user information."""
    sub: str
    email: EmailStr
    name: Optional[str] = None
    given_name: Optional[str] = None
    family_name: Optional[str] = None
    picture: Optional[str] = None
    email_verified: Optional[bool] = True

class UserRegistrationRequest(BaseModel):
    """Schema for user registration request."""
    email: EmailStr
    password: str
    username: str
    phone: str
    role: int
    location: str
    
    # Role-specific optional fields
    license_number: Optional[str] = None
    specialization: Optional[str] = None
    pharmacy_name: Optional[str] = None
    vehicle_number: Optional[str] = None
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters long')
        return v
    
   
    
    @validator('phone')
    def validate_phone(cls, v):
        # Basic phone validation - you can make this more sophisticated
        if not v or len(v.strip()) < 10:
            raise ValueError('Phone number must be at least 10 characters')
        return v.strip()


class UserResponse(BaseModel):
    """Schema for user response."""
    id: int
    email: str
    username: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    role: Optional[str] = None
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True



# login request

class LoginRequest(BaseModel):
    identifier: str
    password: str

