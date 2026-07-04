from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.memory import router as memory_router

app = FastAPI(title="Memzee API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(memory_router)