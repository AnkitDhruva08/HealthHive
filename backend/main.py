from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from app.api.routes import auth_routes, dashboard_routes



load_dotenv()
# Database
from app.db.database import Base, engine



# FastAPI instance
app = FastAPI(title="Backend")


@app.on_event("startup")
def create_tables():
    print("📦 Initializing database tables...")
    Base.metadata.create_all(bind=engine)




# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/")
def health_check():
    return {"message": "🚀 FastAPI backend is running"}

# Register all routers 
app.include_router(auth_routes.router, prefix="/api", tags=["Auth"])
app.include_router(dashboard_routes.router, prefix="/api", tags=["Dashboard"])
