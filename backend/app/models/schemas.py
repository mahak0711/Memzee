from pydantic import BaseModel


class RememberRequest(BaseModel):
    content: str


class RememberResponse(BaseModel):
    success: bool
    message: str


class RecallRequest(BaseModel):
    query: str