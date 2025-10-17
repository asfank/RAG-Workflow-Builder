# RAG Workflow Builder - Frontend

A React-based visual workflow builder for creating and testing RAG (Retrieval-Augmented Generation) pipelines.

## Features

- **Visual Workflow Builder**: Drag-and-drop interface powered by React Flow
- **4 Node Types**: User Query, KnowledgeBase, LLM Engine, Output
- **Node Configuration**: Customize each node's properties in the right panel
- **Workflow Validation**: Ensure proper connections before execution
- **Live Testing**: Chat interface to test workflows with real queries
- **Supabase Authentication**: Secure login/registration system

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Auth.jsx              # Login/Register component
│   │   ├── Sidebar.jsx           # Draggable node library
│   │   ├── WorkflowCanvas.jsx    # React Flow canvas
│   │   ├── ConfigPanel.jsx       # Node configuration panel
│   │   └── ChatModal.jsx         # Chat interface for testing
│   ├── pages/
│   │   └── Builder.jsx           # Main builder page
│   ├── utils/
│   │   ├── supabase.js           # Supabase client
│   │   └── api.js                # Backend API calls
│   ├── App.jsx                   # Root component with auth check
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── index.html
├── vite.config.js
├── package.json
├── Dockerfile
└── nginx.conf
```

## Prerequisites

- Node.js 18+ and npm
- A Supabase project (for authentication)
- Backend API running (see backend README)

## Installation

### Local Development

1. **Navigate to frontend directory**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```
VITE_BACKEND_URL=http://localhost:8000
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start development server**:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## Docker

### Build and run the frontend container:

```bash
docker build -t rag-frontend .
docker run -p 3000:3000 rag-frontend
```

### Using Docker Compose (Full Stack):

From the project root:

```bash
docker-compose up
```

This starts both frontend (port 3000) and backend (port 8000).

## Usage

### 1. Authentication
- Sign up with email and password
- Or sign in if you already have an account

### 2. Build Your Workflow
- **Drag nodes** from the left sidebar to the canvas
- **Connect nodes** by clicking and dragging from one node's handle to another
- **Configure nodes** by clicking on them and editing properties in the right panel

### 3. Validate Your Stack
- Click **"Build Stack"** to validate the workflow
- Required connections:
  - User Query → KnowledgeBase or LLM Engine
  - LLM Engine → Output
  - Optional: KnowledgeBase → LLM Engine

### 4. Test Your Workflow
- Click **"Chat with Stack"** to open the chat modal
- Type a query and click **"Send"**
- The workflow will execute and return a response

## Node Types

### User Query (Input Node)
- Entry point for user questions
- Configurable placeholder text

### KnowledgeBase (Processing Node)
- Represents document retrieval system
- Configurable document source

### LLM Engine (Processing Node)
- Handles LLM processing
- Configurable system prompt
- Toggle for context usage

### Output (Output Node)
- Final workflow output
- Configurable output format (text, markdown, JSON)

## API Integration

The frontend communicates with the backend via the `callBackend` utility function:

```javascript
import { callBackend } from './utils/api'

const response = await callBackend('/api/run-workflow', {
  workflow: workflowData,
  query: userMessage
})
```

## Environment Variables

- `VITE_BACKEND_URL`: Backend API URL (default: `http://localhost:8000`)
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Development Tips

- React Flow provides automatic layout and zoom controls
- MiniMap helps navigate large workflows
- Node state is managed with React Flow's built-in hooks
- Authentication state is handled by Supabase's `onAuthStateChange`

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend has proper CORS configuration for your frontend URL.

### Authentication Not Working
- Verify your Supabase credentials in `.env`
- Check that your Supabase project has email/password authentication enabled

### Workflow Not Executing
- Ensure the backend is running and accessible
- Check browser console for API errors
- Verify `VITE_BACKEND_URL` is correct

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Flow** - Visual workflow editor
- **Supabase** - Authentication and user management
- **Nginx** - Production web server (Docker)
