from fastapi import FastAPI
from app.routers.memory import router as memory_router

app = FastAPI(title="Memzee API")

app.include_router(memory_router)