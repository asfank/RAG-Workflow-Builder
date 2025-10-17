# RAG Workflow API - FastAPI Backend

A modular FastAPI backend for document upload, indexing, and RAG workflow execution.

## Features

- **Document Upload**: Upload PDF files via multipart form data
- **Text Extraction**: Extract text from PDFs using PyMuPDF
- **Document Indexing**: Generate embeddings and store in vector database
- **Workflow Execution**: Run custom RAG workflows with LLM integration

## Project Structure

```
project/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py       # Pydantic models
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── health.py        # Health check endpoint
│   │   ├── documents.py     # Document upload/index endpoints
│   │   └── workflow.py      # Workflow execution endpoint
│   └── services/
│       ├── __init__.py
│       ├── document_service.py    # Document processing logic
│       ├── vector_service.py      # Embedding generation & storage
│       └── workflow_service.py    # Workflow execution logic
├── requirements.txt
├── Dockerfile
├── .env.example
└── README.md
```

## API Endpoints

### Health Check
- `GET /api/health` - Returns service status

### Document Management
- `POST /api/upload-doc` - Upload a PDF document
- `POST /api/index-doc` - Index an uploaded document

### Workflow Execution
- `POST /api/run-workflow` - Execute a RAG workflow with a query

## Installation

### Option 1: Local Development

1. **Create a virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

4. **Run the server**:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Option 2: Docker

1. **Build the Docker image**:
```bash
docker build -t rag-workflow-api .
```

2. **Run the container**:
```bash
docker run -p 8000:8000 --env-file .env rag-workflow-api
```

## Environment Variables

Create a `.env` file based on `.env.example`:

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `OPENAI_API_KEY`: OpenAI API key for embeddings/LLM
- `VECTOR_STORE_PATH`: Path to store vector data (default: `./data`)

## API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Example Usage

### 1. Check Health
```bash
curl http://localhost:8000/api/health
```

### 2. Upload a Document
```bash
curl -X POST "http://localhost:8000/api/upload-doc" \
  -F "file=@document.pdf"
```

### 3. Index the Document
```bash
curl -X POST "http://localhost:8000/api/index-doc" \
  -H "Content-Type: application/json" \
  -d '{"document_id": "your-document-id"}'
```

### 4. Run a Workflow
```bash
curl -X POST "http://localhost:8000/api/run-workflow" \
  -H "Content-Type: application/json" \
  -d '{
    "workflow": {
      "name": "Q&A Workflow",
      "steps": ["retrieve", "generate"]
    },
    "query": "What is the main topic of the document?"
  }'
```

## Development Notes

- The current implementation uses **placeholder functions** for:
  - `generate_embeddings()`: Returns dummy embeddings
  - `simulate_llm_call()`: Returns simulated LLM response
- To integrate real services, update the service layer functions with actual API calls to OpenAI or other providers
- Vector storage currently uses local JSON files; can be replaced with ChromaDB or Supabase pgvector

## Dependencies

- **FastAPI**: Modern web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI
- **PyMuPDF**: PDF text extraction
- **OpenAI**: LLM and embedding API client
- **ChromaDB**: Vector database for embeddings
- **Pydantic**: Data validation and settings management
