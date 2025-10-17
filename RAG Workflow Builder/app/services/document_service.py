import os
import uuid
import fitz
from fastapi import UploadFile
from app.services.vector_service import generate_embeddings, store_embeddings
from app.config import settings


async def save_document(file: UploadFile) -> str:
    document_id = str(uuid.uuid4())
    upload_dir = os.path.join(settings.VECTOR_STORE_PATH, "documents")
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, f"{document_id}.pdf")

    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    return document_id


def extract_text(document_id: str) -> str:
    upload_dir = os.path.join(settings.VECTOR_STORE_PATH, "documents")
    file_path = os.path.join(upload_dir, f"{document_id}.pdf")

    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()

    return text


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    chunks = []
    start = 0
    text_length = len(text)

    while start < text_length:
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += (chunk_size - overlap)

    return chunks


async def index_document(document_id: str) -> int:
    text = extract_text(document_id)

    chunks = chunk_text(text)

    embeddings = await generate_embeddings(chunks)

    await store_embeddings(document_id, chunks, embeddings)

    return len(chunks)
