from pydantic import BaseModel
from typing import Dict, Any, List


class HealthResponse(BaseModel):
    status: str


class UploadDocResponse(BaseModel):
    message: str
    filename: str
    document_id: str


class IndexDocRequest(BaseModel):
    document_id: str


class IndexDocResponse(BaseModel):
    message: str
    document_id: str
    chunks_indexed: int


class WorkflowRequest(BaseModel):
    workflow: Dict[str, Any]
    query: str


class WorkflowResponse(BaseModel):
    response: str
    workflow_executed: Dict[str, Any]
