import { useCallback, useState } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { callBackend } from '../utils/api'
import ChatModal from './ChatModal'

let id = 0
const getId = () => `node_${id++}`

export default function WorkflowCanvas({ selectedNode, onSelectNode, onUpdateNode }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = event.target.getBoundingClientRect()
      const data = JSON.parse(
        event.dataTransfer.getData('application/reactflow')
      )

      const position = {
        x: event.clientX - reactFlowBounds.left - 75,
        y: event.clientY - reactFlowBounds.top - 20,
      }

      const newNode = {
        id: getId(),
        type: data.nodeType,
        position,
        data: { label: data.label },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes]
  )

  const onNodeClick = useCallback(
    (event, node) => {
      onSelectNode(node)
    },
    [onSelectNode]
  )

  const handleUpdateNode = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: newData } : node
        )
      )
      onUpdateNode(nodeId, newData)
    },
    [setNodes, onUpdateNode]
  )

  const validateWorkflow = () => {
    if (nodes.length === 0) {
      setValidationMessage('⚠️ Add at least one node to the canvas')
      return false
    }

    const userQuery = nodes.find((n) => n.data.label === 'User Query')
    const llmEngine = nodes.find((n) => n.data.label === 'LLM Engine')
    const output = nodes.find((n) => n.data.label === 'Output')

    if (!userQuery) {
      setValidationMessage('⚠️ Missing "User Query" node')
      return false
    }
    if (!llmEngine) {
      setValidationMessage('⚠️ Missing "LLM Engine" node')
      return false
    }
    if (!output) {
      setValidationMessage('⚠️ Missing "Output" node')
      return false
    }

    const hasUserToLLM = edges.some(
      (e) =>
        nodes.find((n) => n.id === e.source)?.data.label === 'User Query' &&
        (nodes.find((n) => n.id === e.target)?.data.label === 'LLM Engine' ||
          nodes.find((n) => n.id === e.target)?.data.label === 'KnowledgeBase')
    )

    const hasLLMToOutput = edges.some(
      (e) =>
        nodes.find((n) => n.id === e.source)?.data.label === 'LLM Engine' &&
        nodes.find((n) => n.id === e.target)?.data.label === 'Output'
    )

    if (!hasUserToLLM) {
      setValidationMessage('⚠️ Connect "User Query" to "KnowledgeBase" or "LLM Engine"')
      return false
    }

    if (!hasLLMToOutput) {
      setValidationMessage('⚠️ Connect "LLM Engine" to "Output"')
      return false
    }

    setValidationMessage('✅ Workflow is valid!')
    setTimeout(() => setValidationMessage(''), 3000)
    return true
  }

  const handleChatSend = async (message) => {
    const workflow = {
      name: 'Custom Workflow',
      nodes: nodes.map((n) => ({ id: n.id, type: n.data.label, config: n.data })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    }

    const response = await callBackend('/api/run-workflow', {
      workflow,
      query: message,
    })

    return response.response
  }

  return (
    <div style={styles.container}>
      <div style={styles.toolbar}>
        <button onClick={validateWorkflow} style={styles.button}>
          Build Stack
        </button>
        <button
          onClick={() => {
            if (validateWorkflow()) {
              setIsChatOpen(true)
            }
          }}
          style={{ ...styles.button, backgroundColor: '#10b981' }}
        >
          Chat with Stack
        </button>
        {validationMessage && (
          <div style={styles.message}>{validationMessage}</div>
        )}
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onSend={handleChatSend}
      />
    </div>
  )
}

const styles = {
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
  },
  toolbar: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  message: {
    padding: '10px 16px',
    backgroundColor: 'white',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
}
