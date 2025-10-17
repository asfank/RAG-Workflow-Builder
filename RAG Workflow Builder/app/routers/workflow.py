from fastapi import APIRouter, HTTPException
from app.models.schemas import WorkflowRequest, WorkflowResponse
from app.services.workflow_service import execute_workflow

router = APIRouter(prefix="/api", tags=["workflow"])


@router.post("/run-workflow", response_model=WorkflowResponse)
async def run_workflow(request: WorkflowRequest):
    try:
        response = await execute_workflow(request.workflow, request.query)
        return {
            "response": response,
            "workflow_executed": request.workflow
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
