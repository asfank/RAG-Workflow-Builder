from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import UploadDocResponse, IndexDocRequest, IndexDocResponse
from app.services.document_service import save_document, index_document

router = APIRouter(prefix="/api", tags=["documents"])


@router.post("/upload-doc", response_model=UploadDocResponse)
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    try:
        document_id = await save_document(file)
        return {
            "message": "Document uploaded successfully",
            "filename": file.filename,
            "document_id": document_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/index-doc", response_model=IndexDocResponse)
async def index_document_endpoint(request: IndexDocRequest):
    try:
        chunks_indexed = await index_document(request.document_id)
        return {
            "message": "Document indexed successfully",
            "document_id": request.document_id,
            "chunks_indexed": chunks_indexed
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
