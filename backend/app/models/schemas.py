from pydantic import BaseModel


class RememberRequest(BaseModel):
    content: str


class RememberResponse(BaseModel):
    success: bool
    message: str


class RecallRequest(BaseModel):
    query: str


class RecallResponse(BaseModel):
    answer: str
    kind: str
    search_type: str
    dataset: str
    source: str


class GitHubImportRequest(BaseModel):
    url: str