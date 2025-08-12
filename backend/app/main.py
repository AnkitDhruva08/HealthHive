from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv


load_dotenv()
# Database
from app.db.database import Base, engine

app = FastAPI(title="Backend")


@app.on_event("startup")
def create_tables():
    print("📦 Initializing database tables...")
    Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    
    return {"message": "HealthHive Backend is up!"}
