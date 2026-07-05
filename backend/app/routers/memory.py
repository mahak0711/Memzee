from fastapi import APIRouter
from app.services.memory_service import memory_service
from app.models.schemas import (
    RememberRequest,
    RememberResponse,
    RecallRequest,
    RecallResponse,
    GitHubImportRequest,
    YouTubeImportRequest,
)
from app.services.github_service import github_service
from app.services.cognee_service import cognee_service
from fastapi import HTTPException

from app.services.youtube_service import youtube_service

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
        request.content,
        request.dataset
    )


@router.post(
    "/recall",
    response_model=RecallResponse,
)
async def recall_memory(
    request: RecallRequest,
):
    return await cognee_service.recall(
        request.query,
        request.dataset
    )


@router.get("/graph")
async def graph(dataset:str):
    return await cognee_service.graph(dataset)

@router.get("/list")
async def list_memories(dataset:str):
    return memory_service.load(dataset)

@router.post("/github")
async def import_github(request: GitHubImportRequest):

    readme = github_service.fetch_readme(request.url)

    await cognee_service.remember(readme,
                                  request.dataset)

    return {
        "success": True,
        "message": "Repository imported successfully."
    }

@router.delete("/forget/{memory_id}")
async def forget_memory(
    memory_id: str,
    dataset: str,
):
    return await cognee_service.forget(
        memory_id,
        dataset,
    )

@router.post("/youtube")
async def import_youtube(
    request: YouTubeImportRequest,
):

    transcript = youtube_service.fetch_transcript(
        request.url
    )

    await cognee_service.remember(transcript,
                                  request.dataset)

    return {
        "success": True,
        "message": "Video imported successfully."
    }