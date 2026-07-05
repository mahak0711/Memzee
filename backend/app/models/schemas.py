from pydantic import BaseModel


class RememberRequest(BaseModel):
    content: str
    dataset: str


class RememberResponse(BaseModel):
    success: bool
    message: str


class RecallRequest(BaseModel):
    query: str
    dataset: str


class RecallResponse(BaseModel):
    answer: str
    kind: str
    search_type: str
    dataset: str
    source: str


class GitHubImportRequest(BaseModel):
    url: str
    dataset: str

class YouTubeImportRequest(BaseModel):
    url: str
    dataset: str