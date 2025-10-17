import os
import json
from typing import List
from app.config import settings


async def generate_embeddings(texts: List[str]) -> List[List[float]]:
    embeddings = []
    for text in texts:
        embedding = [0.1] * 1536
        embeddings.append(embedding)

    return embeddings


async def store_embeddings(document_id: str, chunks: List[str], embeddings: List[List[float]]):
    vector_dir = os.path.join(settings.VECTOR_STORE_PATH, "vectors")
    os.makedirs(vector_dir, exist_ok=True)

    data = {
        "document_id": document_id,
        "chunks": chunks,
        "embeddings": embeddings
    }

    file_path = os.path.join(vector_dir, f"{document_id}.json")
    with open(file_path, "w") as f:
        json.dump(data, f)


async def search_similar_chunks(query: str, top_k: int = 5) -> List[str]:
    query_embedding = await generate_embeddings([query])

    relevant_chunks = [
        "This is a placeholder chunk that would be returned from vector search.",
        "Another relevant chunk based on semantic similarity.",
        "Context retrieved from indexed documents."
    ]

    return relevant_chunks[:top_k]
