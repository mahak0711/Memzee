from fastapi import APIRouter

from app.models.schemas import (
    RememberRequest,
    RememberResponse,
    RecallRequest,
    RecallResponse,
)

from app.services.cognee_service import cognee_service

router = APIRouter(
    prefix="/api/memory",
    tags=["Memory"],
)


@router.post(
    "/remember",
    response_model=RememberResponse,
)
async def remember_memory(
    request: RememberRequest,
):
    return await cognee_service.remember(
        request.content
    )


@router.post(
    "/recall",
    response_model=RecallResponse,
)
async def recall_memory(
    request: RecallRequest,
):
    return await cognee_service.recall(
        request.query
    )

@router.get("/list")
async def list_memories():
    return await cognee_service.list_memories()

@router.get("/graph")
async def graph():
    return await cognee_service.graph()