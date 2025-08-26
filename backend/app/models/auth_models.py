from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.db.database import Base
from sqlalchemy.types import DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String, index=True, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    users = relationship("User", back_populates="role") 



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True, nullable=False)  
    hashed_password = Column(String, nullable=False)

    # Common fields
    username = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)

    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    role = relationship("Role", back_populates="users")

    is_active = Column(Boolean, default=True)

    # Role-specific fields
    license_number = Column(String, nullable=True)       # doctor
    specialization = Column(String, nullable=True)       # doctor
    pharmacy_name = Column(String, nullable=True)        # pharmacy
    vehicle_number = Column(String, nullable=True)       # delivery



