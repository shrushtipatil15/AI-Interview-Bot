from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.interview import router as interview_router

app = FastAPI(
    title="AI Interview Bot API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication APIs
app.include_router(
    auth_router,
    prefix="/api/auth"
)

# Interview APIs
app.include_router(
    interview_router,
    prefix="/api/interview"
)

@app.get("/")
def home():
    return {
        "message": "AI Interview Bot API Running"
    }