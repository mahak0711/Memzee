from fastapi import APIRouter

from app.models.schemas import (
    RememberRequest,
    RecallRequest,
)

from app.services.cognee_service import cognee_service

router = APIRouter(prefix="/api/memory", tags=["Memory"])


@router.post("/remember")
async def remember_memory(request: RememberRequest):
    return await cognee_service.remember(
        request.content
    )


@router.post("/recall")
async def recall_memory(request: RecallRequest):
    return await cognee_service.recall(
        request.query
    )