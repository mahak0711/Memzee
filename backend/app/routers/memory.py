from fastapi import APIRouter
from app.services.memory_service import memory_service
from app.models.schemas import (
    RememberRequest,
    RememberResponse,
    RecallRequest,
    RecallResponse,
    GitHubImportRequest,
)
from app.services.github_service import github_service
from app.services.cognee_service import cognee_service
from fastapi import HTTPException
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


@router.get("/graph")
async def graph():
    return await cognee_service.graph()

@router.get("/list")
async def list_memories():
    return memory_service.load()

@router.post("/github")
async def import_github(request: GitHubImportRequest):

    readme = github_service.fetch_readme(request.url)

    await cognee_service.remember(readme)

    return {
        "success": True,
        "message": "Repository imported successfully."
    }


@router.delete("/forget/{memory_id}")
async def forget_memory(memory_id: str):
    return await cognee_service.forget(memory_id)